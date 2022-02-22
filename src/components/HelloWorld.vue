<template>
  <div>
    <section>
      <h1>Welcome to Seggle!</h1>
      <p class="description">세종인을 위한 AI 대회가 시작되었어요!</p>
      <canvas id="pixie"></canvas>
    </section>
    <section class="horizontal">
      <div class="pin-wrap">
        <div class="animation-wrap to-right">
          <div class="item">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, temporibus esse magni illum eos natus ipsum minus? Quis excepturi voluptates atque dolorum minus eligendi! Omnis minima magni recusandae ex dignissimos.</div>
          <div class="item">Eaque ullam illum nobis deleniti mollitia unde, sed, nemo ipsa ratione ex, dicta aliquam voluptates! Odio vitae eum nobis dignissimos sunt ipsum repellendus totam optio distinctio. Laborum suscipit quia aperiam.</div>
          <div class="item">Animi, porro molestias? Reiciendis dolor aspernatur ab quos nulla impedit, dolores ullam hic commodi nobis nam. Dolorem expedita laudantium dignissimos nobis a. Dolorem, unde quidem. Tempora et a quibusdam inventore!</div>
          <div class="item">Labore, unde amet! Alias delectus hic laboriosam et dolorum? Saepe, dicta eaque? Veniam eos blanditiis neque. Officia et nostrum, tempore modi quo praesentium aspernatur vero dolor, ipsa unde perspiciatis minima.</div>
          <div class="item">Quaerat error dolorem aspernatur magni dicta ut consequuntur maxime tempore. Animi odio eos quod culpa nulla consectetur? Aperiam ipsam ducimus delectus reprehenderit unde, non laborum voluptate laboriosam, officiis at ea!</div>
        </div>
      </div>
    </section>
    <footer class="bg-dark py-4 mt-auto">
      <div class="container px-5">
        <div
          class="row align-items-center justify-content-between flex-column flex-sm-row"
        >
          <div class="col-auto">
            <div class="small m-0 text-white">
              Copyright &copy; Seggle
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
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted () {
    this.animation()
  },
  methods: {
    animation () {
      const horizontalSections = gsap.utils.toArray('section.horizontal')
      horizontalSections.forEach(function (sec, i) {
        var thisPinWrap = sec.querySelector('.pin-wrap')
        var thisAnimWrap = thisPinWrap.querySelector('.animation-wrap')
        var getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth)
        gsap.fromTo(thisAnimWrap, {
          x: () => thisAnimWrap.classList.contains('to-right') ? 0 : getToValue()
        }, {
          x: () => thisAnimWrap.classList.contains('to-right') ? getToValue() : 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sec,
            start: 'top top',
            end: () => '+=' + (thisAnimWrap.scrollWidth - window.innerWidth),
            pin: thisPinWrap,
            pinSpacing: true,
            invalidateOnRefresh: true,
            // anticipatePin: 1,
            scrub: true
            // markers: true,
          }
        })
      })
      // 여기서부터는 별
      var canvas = document.querySelector('#pixie')
      var WIDTH = window.innerWidth
      var HEIGHT = canvas.offsetHeight
      var MAX_PARTICLES = (WIDTH * HEIGHT) / 20000
      var DRAW_INTERVAL = 60
      var context = canvas.getContext('2d')
      var gradient = null
      var pixies = []
      canvas.width = WIDTH
      canvas.height = HEIGHT

      function Circle () {
        this.settings = { ttl: 8000, xmax: 5, ymax: 2, rmin: 8, rmax: 15, drt: 1 }
        this.reset = function () {
          this.x = WIDTH * Math.random() // X 위치 랜덤 (0 ~ WIDTH)
          this.y = HEIGHT * Math.random() // Y 위치 랜덤 (0 ~ HEIGHT)
          this.r = ((this.settings.rmax - 1) * Math.random()) + 1 // 반지름 크기 랜덤 (1 ~ rmax)
          this.dx = (Math.random() * this.settings.xmax) * (Math.random() < 0.5 ? -1 : 1) // X 이동거리 랜덤 (-xmax ~ xmax)
          this.dy = (Math.random() * this.settings.ymax) * (Math.random() < 0.5 ? -1 : 1) // Y 이동거리 랜덤 (-ymax ~ ymax)
          this.hl = (this.settings.ttl / DRAW_INTERVAL) * (this.r / this.settings.rmax) // 총 생존 시간 (반지름 크기에 비례)
          this.rt = 0 // 현재 생존 시간 (0 -> hl -> 0)
          this.settings.drt = Math.random() + 1 // 노화 속도 (1 ~ 2)
          this.stop = Math.random() * 0.2 + 0.4 // 음영 범위 (0.4 ~ 0.6)
        }
        this.fade = function () {
          this.rt += this.settings.drt // 노화 진행
          if (this.rt >= this.hl) {
            this.rt = this.hl
            this.settings.drt = this.settings.drt * -1
          } else if (this.rt < 0) {
            this.reset() // 수명이 다하면 새로운 위치에 생성
          }
        }

        this.draw = function () {
          var newo = (this.rt / this.hl)
          context.beginPath()
          context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true) // (x, y) 좌표에 반지름 r 크기의 원 그림
          context.closePath()

          var cr = this.r * newo // 밝기에 따른 반지름
          gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr < this.settings.rmin) ? this.settings.rmin : cr)
          gradient.addColorStop(0.0, 'rgba(255,255,255,' + newo + ')')
          gradient.addColorStop(this.stop, 'rgba(77,101,181,' + (newo * 0.6) + ')')
          gradient.addColorStop(1.0, 'rgba(77,101,181,0)')
          context.fillStyle = gradient
          context.fill()
        }

        this.move = function () {
          this.x += (1 - this.rt / this.hl) * this.dx
          this.y += (1 - this.rt / this.hl) * this.dy
          if (this.x > WIDTH || this.x < 0) this.dx *= -1
          if (this.y > HEIGHT || this.y < 0) this.dy *= -1
        }
      }
      function draw () {
        context.clearRect(0, 0, WIDTH, HEIGHT)

        for (var i = pixies.length; i < MAX_PARTICLES; i++) {
          pixies.push(new Circle())
          pixies[i].reset()
        }
        for (var j = 0; j < MAX_PARTICLES; j++) {
          pixies[j].fade()
          pixies[j].move()
          pixies[j].draw()
        }
      }
      setInterval(draw, DRAW_INTERVAL)
      function setDimensions (e) {
        WIDTH = window.innerWidth
        HEIGHT = canvas.offsetHeight
        MAX_PARTICLES = (WIDTH * HEIGHT) / 20000
        canvas.width = WIDTH
        canvas.height = HEIGHT
      }
      window.addEventListener('resize', setDimensions)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Signika+Negative:300,400&display=swap');

html, body, section.horizontal {
  overflow-x: hidden;
}

#pixie {
  width: 100%;
  height: 20rem;
  z-index:1;
  background: linear-gradient(rgb(0, 0, 0) 50%, rgb(25, 19, 39)80%, rgb(43, 32, 72));
}

body {
  font-family: "Signika Negative", sans-serif;
  font-weight: 300;
  margin: 0;
  padding: 0;
}
h1 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -100%);
  z-index: 2;
  font-weight: bold;
  margin: 0;
}
p.description {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 100%);
  padding: 0;
}
p {
  margin: 0;
  padding: 50px 0 50px 50px;
}
section {
  width: 100%;
  height: 100%;
  position: relative;
}
section.blank {
  height: 20rem;
}
section:nth-of-type(odd) {
  color: white;
}
section:nth-of-type(even) {
  background-color: #ffffff;
}
section.horizontal {
  overflow-x: hidden;
}
section.horizontal .pin-wrap,
section.horizontal .animation-wrap {
  display: flex;
  position: relative;
  z-index: 0;
  height: 100vh;
}
section.horizontal .item {
  position: relative;
  padding: 150px 80px;
  flex: 0 0 500px;
  height: 100vh;
  display: flex;
  align-items: center;
  line-height: 1.7;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  background-color: transparent;
}
section.horizontal .item:before {
  position: absolute;
  font-size: 100px;
  opacity: .13;
  font-weight: bold;
  z-index: -1;
  -webkit-transform: translate(-30px, -50px);
  transform: translate(-30px, -50px);
  line-height: 1;
}
section.horizontal .animation-wrap.to-right {
  counter-reset: item;
  float: left;
}
section.horizontal .animation-wrap.to-left {
  counter-reset: item 11;
  float: right;
}
section.horizontal .animation-wrap.to-right .item:before {
  counter-increment: item;
  content: counter(item);
}
section.horizontal .animation-wrap.to-left .item:before {
  counter-increment: item -1;
  content: counter(item);
}
section.horizontal .animation-wrap .item:nth-child(2n+2) {
  align-items: flex-start;
}
section.horizontal .animation-wrap .item:nth-child(4n+4) {
  align-items: flex-end;
}
</style>
