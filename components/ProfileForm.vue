<template>
  <form>
    <div class="profile-field">
      <h2>自己紹介</h2>
      <p>{{ introduction }}</p>
    </div>

    <div class="profile-field">
      <h2>リンク集</h2>
      <div v-for="link in links" :key="link.url">
        <div class="link">
          <input :value="link.name" /><input :value="link.url" />
        </div>
      </div>
      <div v-if="isAddLinkFieldVisible" class="link">
        <input
          v-model="newLink.name"
          placeholder="リンク名を入力"
          type="text"
        />
        <input v-model="newLink.url" placeholder="URLを入力" type="url" />
        <button type="button" @click="addLink">OK</button>
      </div>
      <button type="button" @click="showNewLinkField">
        ＋リンクを追加する
      </button>
    </div>

    <div class="submit-button-container">
      <button :disabled="status === 'pending'" type="button" @click="postLinks">
        更新する
      </button>
    </div>
  </form>
</template>
<script setup lang="ts">
import { useFetchFromGaaamiiAPI } from "../composables/useFetchFromGaaamiiAPI";

type Link = { name: string; url: string };
const introduction = ref(
  "東京都在住のソフトウェア開発者です。仕事や趣味でウェブアプリの画面を作ったりRESTish APIを作ったりしています。",
);
const links = ref<Link[]>([{ name: "ブログ", url: "https://blog.gaaamii.jp" }]);
const newLink = ref<{ name: string; url: string }>({ name: "", url: "" });
const isAddLinkFieldVisible = ref<boolean>(false);
const showNewLinkField = () => {
  isAddLinkFieldVisible.value = true;
};
const addLink = () => {
  if (newLink.value.name && newLink.value.url) {
    links.value = [
      ...links.value,
      {
        name: newLink.value.name,
        url: newLink.value.url,
      },
    ];
    newLink.value = {
      name: "",
      url: "",
    };
  }
  isAddLinkFieldVisible.value = false;
};
const { execute, status } = await useFetchFromGaaamiiAPI(
  "links",
  "/links",
  {
    method: "PUT",
    body: { links: links.value },
  },
  { immediate: false },
);
const postLinks = () => {
  execute();
};
</script>
<style scoped>
h2 {
  margin-top: 0;
  margin-bottom: 0.2em;
}
input,
textarea {
  padding: 8px;
  width: 100%;
}
button:disabled {
  background: gray;
}
.profile-field {
  margin-top: 32px;
  margin-bottom: 10px;
}
.submit-button-container {
  display: flex;
  justify-content: flex-end;
}
.link {
  display: flex;
  gap: 8px;
  margin: 4px 0;
}
</style>
