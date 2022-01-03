<template>
  <form class="board" v-on:submit.prevent="submitForm">
    <h1 class="board-header">글쓰기</h1>
    <div class="title">
        <label for="board-title">제목</label>
        <input id="board-title" type="text" placeholder="제목을 입력하세요">
    </div>
    <div class="content">
        <label for="board-content">내용</label>
        <textarea name="" id="board-content" cols="40" rows="10" placeholder="내용을 입력하세요"></textarea>
    </div>
    <button class="board-btn" type="submit" v-on:click="submitForm">작성</button>
  </form>
</template>

<script>
export default {
  name: 'Board'
}
</script>

<style>
.board {
    padding: 8vh 40vh;
}

.board-header {
    font-weight: 800;
    font-size: 40px;
    margin-bottom: 5vh;
}

label {
    display: block;
    margin-bottom: 1vh;
    font-size: 22px;
}

.title,
.content {
    padding: 2vh 2vh;
}

#board-title,
#board-content {
    padding: 1vh 1vh;
    font-size: 22px;
    width: 100%;
    border: 2px solid rgb(221, 221, 221);
    border-radius: 1vh;
}

#board-content {
    resize: none;
}

#board-title input::placeholder {
    color:rgb(0, 0, 0, 0.3);
}

.board-btn {
    float: right;
    padding: 1vh 3vh;
    background-color: var(--navy);
    color: white;
    border: none;
    border-radius: 3vh;
    font-size: 20px;
    cursor: pointer;
}
</style>
