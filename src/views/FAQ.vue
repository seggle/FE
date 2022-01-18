<template>
  <div class="container px-5">
    <h1>FAQ</h1>
    <!--아코디언 시작-->
    <div class="accordion px-5 py-3" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Q 대회에 참가하려면 어떻게 해야하나요?
          </button>
        </h2>
        <div
          id="collapseOne"
          class="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <strong>🔎 일반용</strong>
            Seggle 회원이라면 누구든지 참여 가능하며 특정한 주제에 관하여 예측
            분석 모델을 만들고 정확도를 측정하는 대회입니다.<br />
            <strong>🔎 수업용</strong>
            세종대학교에서 열리는 '머신러닝 / 인공지능' 수업과 같이 AI와 관련된
            수업에서 사용합니다. 해당 수업에서 제공하는 비밀번호를 가진 회원만
            해당 대회에 참여가능합니다.
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Q. Seggle에서 개최하는 대회는 어떤 종류와 특징이 있나요?
          </button>
        </h2>
        <div
          id="collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <strong>🔎 일반용</strong>
            Seggle 회원이라면 누구든지 참여 가능하며 특정한 주제에 관하여 예측
            분석 모델을 만들고 정확도를 측정하는 대회입니다.<br />
            <strong>🔎 수업용</strong>
            세종대학교에서 열리는 '머신러닝 / 인공지능' 수업과 같이 AI와 관련된
            수업에서 사용합니다. 해당 수업에서 제공하는 비밀번호를 가진 회원만
            해당 대회에 참여가능합니다.
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            Accordion Item #3
          </button>
        </h2>
        <div
          id="collapseThree"
          class="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <strong>🔎 일반용</strong>
            Seggle 회원이라면 누구든지 참여 가능하며 특정한 주제에 관하여 예측
            분석 모델을 만들고 정확도를 측정하는 대회입니다.<br />
            <strong>🔎 수업용</strong>
            세종대학교에서 열리는 '머신러닝 / 인공지능' 수업과 같이 AI와 관련된
            수업에서 사용합니다. 해당 수업에서 제공하는 비밀번호를 가진 회원만
            해당 대회에 참여가능합니다.
          </div>
        </div>
      </div>
    </div>
    <!--아코디언 끝-->
  </div>
</template>

<style lang="scss" scoped>
h1 {
  padding: 0px 4rem;
  margin-top: 50px;
  font-weight: bold;
  text-align: left;
}
</style>
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup () {}
})
</script>
