<template>
  <div class="ai-chat-drawer">
    <el-button type="primary" class="ai-toggle-btn" @click="toggleDrawer"
      >🤖GLM-4-Plus
    </el-button>
    <!-- 侧边栏 -->
    <el-drawer
      v-model="visible"
      title="🤖GLM-4-Plus"
      direction="rtl"
      :with-header="true"
      :modal="true"
      :size="500"
      :close-on-click-modal="true"
      class="ai-drawer"
      @open="scrollToBottom"
      @close="showChatInput = false"
    >
      <div class="drawer-body">
        <!-- 消息展示区域 -->
        <div class="chat-messages" ref="chatMessages">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            :class="['message', msg.isAI ? 'ai' : 'user']"
          >
            <div v-html="renderMarkdown(msg.text)" />
            <button
              v-if="msg.isAI && msg.text.includes('```')"
              class="copy-button"
              @click="copyToClipboard(msg.text)"
            >
              📋 复制代码
            </button>
          </div>
        </div>

        <!-- 输入区域 -->
        <div v-if="showChatInput" class="chat-input">
          <input
            v-model="input"
            @keyup.enter="handleSend"
            placeholder="请输入你的问题..."
            :disabled="isSending"
          />
          <button @click="handleSend" :disabled="isSending">发送</button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { streamChatGLM } from "@/services/chatglm";

// 注册高亮
marked.setOptions({
  highlight(code, lang) {
    return hljs.highlightAuto(code, [lang]).value;
  },
});

// 状态
const visible = ref(false);
const showChatInput = ref(false);
const input = ref("");
const messages = ref([]);
const chatMessages = ref(null);
const isSending = ref(false);

onMounted(() => {
  messages.value.push({
    text: "你好👋！我是人工智能助手智谱清言，可以叫我小智🤖，很高兴见到你，欢迎问我任何问题。",
    isAI: true,
  });
});

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (chatMessages.value) {
      chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
    }
  });
};

// 发送信息
const handleSend = async () => {
  if (!input.value.trim() || isSending.value) return;
  const question = input.value;
  input.value = "";
  messages.value.push({ text: question, isAI: false });

  const aiMsg = { text: "", isAI: true };
  messages.value.push(aiMsg);
  isSending.value = true;

  try {
    await streamChatGLM(question, (chunk) => {
      aiMsg.text += chunk;
      scrollToBottom();
    });
  } catch (e) {
    aiMsg.text = "连接失败，请稍后再试";
  } finally {
    isSending.value = false;
  }
};

// markdown 渲染
const renderMarkdown = (text) => {
  return marked.parse(text || "");
};

// 复制代码
const copyToClipboard = (text) => {
  const match = text.match(/```[a-z]*\n([\s\S]*?)```/);
  if (match) {
    navigator.clipboard.writeText(match[1]);
    ElMessage.success("代码已复制");
  }
};

const toggleDrawer = () => {
  visible.value = !visible.value;
  if (visible.value) {
    showChatInput.value = true;
  }
};
</script>

<style scoped>
/* 基础样式 */
.ai-chat-drawer {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 999;
}

.ai-toggle-btn {
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  right: -220px;
  border-radius: 10px;
  background-color: #004c99;
  color: white;
  padding: 10px 20px;
  font-weight: 600;
}

.drawer-body {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* 消息列表 */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
  gap: 12px;
}


.message.user {
  align-self: flex-end;
  background: #007bff;
  color: white;
  padding: 8px 14px;
  border-radius: 14px 14px 0 14px;
  max-width: 80%;
}


.message.ai {
  align-self: flex-start;
  background: #e8ebf0;
  color: #333;
  padding: 8px 14px;
  border-radius: 14px 14px 14px 0;
  max-width: 80%;
}


.chat-input {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  padding: 12px;
  border-top: 1px solid #ddd;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.chat-input button {
  padding: 10px 16px;
  background: #004c99;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

/* 代码块样式 */
.copy-button {
  cursor: pointer;
  margin-top: 6px;
  font-size: 12px;
  padding: 4px 8px;
  background: #ddd;
  border: none;
  border-radius: 6px;
}

.cursor {
  display: inline-block;
  width: 1px;
  background: #333;
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

pre code {
  display: block;
  padding: 12px;
  background: #f6f8fa;
  border-radius: 8px;
  overflow-x: auto;
  font-family: "Fira Code", monospace;
}
</style>
