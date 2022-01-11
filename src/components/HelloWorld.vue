<template>
  <div class="hello">
    <header class="bg-dark py-5">
      <div class="container px-5">
        <div class="row gx-5 align-items-center justify-content-center">
          <div class="col-lg-8 col-xl-7 col-xxl-6">
            <div class="my-5 text-center text-xl-start">
              <h1 class="display-5 fw-bolder text-white mb-2">
                {{ msg }}
              </h1>
              <p class="lead fw-normal text-white-50 mb-4">
                세종인을 위한 대회에 참가해보세요!
              </p>
              <div
                class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start"
              >
                <a
                  class="btn btn-primary btn-lg px-4 me-sm-3"
                  href="#features"
                  id="head"
                  >Get Started</a
                >
                <a class="btn btn-outline-light btn-lg px-4" href="#!" id="head"
                  >Learn More</a
                >
              </div>
            </div>
          </div>
          <div class="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
            <img
              class="img-fluid rounded-3 my-5"
              src="https://dummyimage.com/600x400/343a40/6c757d"
              alt="..."
            />
          </div>
        </div>
      </div>
    </header>
    <section class="py-5" id="features">
      <div class="container px-5 my-5">
        <div class="row gx-5 justify-content-center">
          <div class="col-lg-8 col-xl-6">
            <div class="text-center">
              <h2 class="fw-bolder">Seggle에서 진행 중인 문제</h2>
              <p class="lead fw-normal text-muted mb-5">
                연습용 예제부터 시작해서 실전 대회에 참여해보세요!
              </p>
            </div>
          </div>
        </div>
        <div class="row gx-5">
          <div class="col-lg-4 mb-5">
            <div class="card h-100 shadow border-0">
              <img
                class="card-img-top"
                src="https://dummyimage.com/600x350/ced4da/6c757d"
                alt="..."
              />
              <div class="card-body p-4">
                <div class="badge bg-primary bg-gradient rounded-pill mb-2">
                  대회
                </div>
                <a
                  class="text-decoration-none link-dark stretched-link"
                  href="#!"
                  ><h5 class="card-title mb-3">따릉이 대여량 예측하기</h5></a
                >
                <p class="card-text mb-0">
                  서울시 따릉이 대여량을 예측해보세요.
                </p>
              </div>
              <div class="card-footer p-4 pt-0 bg-transparent border-top-0">
                <div class="d-flex align-items-end justify-content-between">
                  <div class="d-flex align-items-center">
                    <img
                      class="rounded-circle me-3"
                      src="https://dummyimage.com/40x40/ced4da/6c757d"
                      alt="..."
                    />
                    <div class="small">
                      <div class="fw-bold">AI Challenge</div>
                      <div class="text-muted">
                        2021-12-04 &middot; <br />
                        정형 | MSE
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mb-5">
            <div class="card h-100 shadow border-0">
              <img
                class="card-img-top"
                src="https://dummyimage.com/600x350/adb5bd/495057"
                alt="..."
              />
              <div class="card-body p-4">
                <div class="badge bg-primary bg-gradient rounded-pill mb-2">
                  일반
                </div>
                <a
                  class="text-decoration-none link-dark stretched-link"
                  href="#!"
                  ><h5 class="card-title mb-3">
                    기상환경에 따른 농산물 가격예측
                  </h5></a
                >
                <p class="card-text mb-0">
                  농산물 가격을 예측하는 모형을 개발해보세요.
                </p>
              </div>
              <div class="card-footer p-4 pt-0 bg-transparent border-top-0">
                <div class="d-flex align-items-end justify-content-between">
                  <div class="d-flex align-items-center">
                    <img
                      class="rounded-circle me-3"
                      src="https://dummyimage.com/40x40/ced4da/6c757d"
                      alt="..."
                    />
                    <div class="small">
                      <div class="fw-bold">기계학습</div>
                      <div class="text-muted">
                        2021-12-03 &middot; 농산물 | MAE
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mb-5">
            <div class="card h-100 shadow border-0">
              <img
                class="card-img-top"
                src="https://dummyimage.com/600x350/6c757d/343a40"
                alt="..."
              />
              <div class="card-body p-4">
                <div class="badge bg-primary bg-gradient rounded-pill mb-2">
                  일반
                </div>
                <a
                  class="text-decoration-none link-dark stretched-link"
                  href="#!"
                  ><h5 class="card-title mb-3">가스공급량 수요예측</h5></a
                >
                <p class="card-text mb-0">
                  한국가스공사가 보유한 데이터를 기반으로 미래 공급량을 예측하는
                  모델을 만들어주세요.
                </p>
              </div>
              <div class="card-footer p-4 pt-0 bg-transparent border-top-0">
                <div class="d-flex align-items-end justify-content-between">
                  <div class="d-flex align-items-center">
                    <img
                      class="rounded-circle me-3"
                      src="https://dummyimage.com/40x40/ced4da/6c757d"
                      alt="..."
                    />
                    <div class="small">
                      <div class="fw-bold">인공지능</div>
                      <div class="text-muted">2022-01-05 &middot; 수요예측</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Call to action-->
        <aside class="bg-primary bg-gradient rounded-3 p-4 p-sm-5 mt-5">
          <div
            class="d-flex align-items-center justify-content-between flex-column flex-xl-row text-center text-xl-start"
          >
            <div class="mb-4 mb-xl-0">
              <div class="fs-3 fw-bold text-white">
                지금 Seggle에 가입하세요!
              </div>
              <div class="text-white-50">Sign up for Seggle.</div>
            </div>
            <div class="ms-xl-4">
              <div class="input-group mb-2">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Email address..."
                  aria-label="Email address..."
                  aria-describedby="button-newsletter"
                />
                <button
                  class="btn btn-outline-light"
                  id="button-newsletter"
                  type="button"
                >
                  Sign up
                </button>
              </div>
              <div class="small text-white-50">
                We care about privacy, and will never share your data.
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
    <!-- Footer-->
    <footer class="bg-dark py-4 mt-auto">
      <div class="container px-5">
        <div
          class="row align-items-center justify-content-between flex-column flex-sm-row"
        >
          <div class="col-auto">
            <div class="small m-0 text-white">
              Copyright &copy; Your Website 2021
            </div>
          </div>
          <div class="col-auto">
            <a class="link-light small" href="#!">Privacy</a>
            <span class="text-white mx-1">&middot;</span>
            <a class="link-light small" href="#!">Terms</a>
            <span class="text-white mx-1">&middot;</span>
            <a class="link-light small" href="#!">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: gray;
}
#head {
  color: white;
}
.problem {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 4px;
  background-color: gainsboro;
}
</style>
