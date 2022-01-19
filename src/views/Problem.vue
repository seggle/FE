<template>
  <div class="container">
    <div class="problem-header">
      <h1 id="title">따릉이 대여량 예측 경진대회</h1>
      <button class="btn">참여하기</button>
    </div>
    <div class="problem-content row">
      <div class="problem-tab col-2">
        <div class="list-group" id="list-tab" role="tablist">
          <a class="list-group-item list-group-item-action active" id="list-info-list" data-bs-toggle="list" href="#list-info" role="tab" aria-controls="list-info">문제 설명</a>
          <a class="list-group-item list-group-item-action" id="list-data-list" data-bs-toggle="list" href="#list-data" role="tab" aria-controls="list-data">데이터</a>
          <a class="list-group-item list-group-item-action" id="list-leaderboard-list" data-bs-toggle="list" href="#list-leaderboard" role="tab" aria-controls="list-leaderboard">리더보드</a>
          <a class="list-group-item list-group-item-action" id="list-submit-list" data-bs-toggle="list" href="#list-submit" role="tab" aria-controls="list-submit">제출</a>
        </div>
      </div>
      <div class="problem-tab-content col-10">
        <div class="tab-content" id="nav-tabContent">
        <!-- 문제 설명 -->
          <div class="tab-pane fade show active" id="list-info" role="tabpanel" aria-labelledby="list-info-list">
            <h5 class="list-title">문제 설명</h5>
            <p class="list-content"> 문제 설명 </p>
            <div class="period">
              <h5>시작 시간</h5>
              <p class="list-content"> 시작 시간 </p>
              <h5>종료 시간</h5>
              <p class="list-content"> 종료 시간 </p>
            </div>
          </div>
        <!-- 데이터 -->
          <div class="tab-pane fade" id="list-data" role="tabpanel" aria-labelledby="list-data-list">
            <h5 class="list-title">데이터 설명<button class="btn">다운로드</button></h5>
            <p class="list-content"> 데이터 설명 </p>
          </div>
        <!-- 리더보드 -->
          <div class="tab-pane fade" id="list-leaderboard" role="tabpanel" aria-labelledby="list-leaderboard-list">
            <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">이름</th>
                <th scope="col">점수</th>
                <th scope="col">제출 횟수</th>
                <th scope="col">제출 날짜</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="users in userList" :key="users">
                <th scope="row">{{ users._id }}</th>
                <td>{{ users.username }}</td>
                <td>{{ users.userScore }}</td>
                <td>{{ users.userSubmitCount }}</td>
                <td>{{ users.userSubmitDate }}</td>
                </tr>
            </tbody>
            </table>
          </div>
        <!-- 제출 -->
          <div class="tab-pane fade" id="list-submit" role="tabpanel" aria-labelledby="list-submit-list">
            <div class="file-submit">
              <h5 class="list-title">csv 파일 제출</h5>
              <input type="file" class="form-control" accept=".csv" placeholder="첨부파일">
              <h5 class="list-title">ipynb 파일 제출</h5>
              <input type="file" class="form-control" accept=".ipynb">
              <button class="btn">파일 제출</button>
            </div>
            <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">csv 파일 이름</th>
                <th scope="col">ipynb 파일 이름</th>
                <th scope="col">점수</th>
                <th scope="col">제출 날짜</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="submit in submitList" :key="submit">
                <th scope="row">{{ submit._id }}</th>
                <td>{{ submit.csvFile }}</td>
                <td>{{ submit.ipynbFile }}</td>
                <td>{{ submit.submitScore }}</td>
                <td>{{ submit.submitDate }}</td>
                </tr>
            </tbody>
            </table>
            <button class="btn">제출</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Problem'
}
</script>

<style lang="scss" scoped>
.container {
  padding: 5rem 0rem;
  .problem-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 3rem 0;
    .btn {
      padding: 0.5rem 2rem;
      font-size: 22px;
      font-weight: bold;
    }
    button:hover {
      background: white;
      color: #0e1b49;
    }
  }
  .list-group-item {
    border: none;
    padding: 1rem 0rem;
    font-size: 20px;
    border-radius: 0.75rem;
    margin-bottom: 1rem;
  }
  .list-group-item.active {
    z-index: 2;
    color: black;
    font-weight: bold;
    background-color: #F4F4F8;
    border-color: #fff;
  }
  .tab-content {
    background-color: var(--colorBg10);
    // border: 0.0625rem solid #D7E2EB;
    margin-top: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 8%);
    padding: 2rem 1rem;
    .list-title {
      padding: 0.5rem 2rem;
      margin-top: 1.5rem;
      font-weight: bold;
    }
    .period {
      display: flex;
      justify-content: center;
      h5 {
        padding: 0rem 1rem;
        font-weight: bold;
      }
      p {
        margin-right: 10px;
      }
    }
    .btn {
      float: right;
      padding: 0.5rem 1.5rem;
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 2rem;
    }
    .form-control {
      background-color: #F4F4F8;
      border: none;
      margin-bottom: 1rem;
      line-height: 10;
      color: #98A8B9;
    }
    .form-control::file-selector-button {
        color: transparent;
        background-color: #F4F4F8;
    }
  }
}
</style>
