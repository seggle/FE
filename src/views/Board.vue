<template>
  <div class="container">
    <form class="board col" v-on:submit.prevent="submitForm">
        <h1 class="board-header py-4 fw-bolder">글쓰기</h1>
        <div class="title py-2">
            <label for="board-title" class="p-2 fs-4">제목</label>
            <input id="board-title" class="form-control" type="text" placeholder="제목을 입력하세요">
        </div>
        <div class="content py-2">
            <label for="board-content" class="p-2 fs-4">내용</label>
            <textarea id="board-content" class="form-control mb-3 p-3" cols="40" rows="10" placeholder="내용을 입력하세요"></textarea>
        </div>
        <button class="btn btn-dark" type="submit" v-on:click="submitForm">작성</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Board'
}
</script>

<style scoped>
#board-content {
    resize: none;
}

.btn {
    float: right;
}
</style>
