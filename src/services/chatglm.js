// chatglm.js - 智谱流式对话封装
const API_KEY = "672ba997333d413f80ee1134ab0b8da4.rblaxWtQWVdzwgkS"; // AI-key

export async function streamChatGLM(prompt, onData) {
  const response = await fetch(
    "https://open.bigmodel.cn/api/paas/v4/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "glm-4",
        stream: true,
        messages: [{ role: "user", content: prompt }],
      }),
    }
  );

  if (!response.ok || !response.body) {
    throw new Error("连接失败，请检查 API Key 或网络");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk
      .split("\n")
      .filter((line) => line.trim().startsWith("data:"));

    for (const line of lines) {
      const jsonStr = line.replace(/^data:\s*/, "");
      if (jsonStr === "[DONE]") return;

      try {
        const parsed = JSON.parse(jsonStr);
        const delta = parsed.choices?.[0]?.delta?.content;
        if (delta) onData(delta);
      } catch (err) {
        console.warn("解析错误：", line);
      }
    }
  }
}
