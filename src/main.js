import Vue from "vue";
import "./style.css"


Vue.config.productionTip = false;

new Vue({
  el: "#app",
  data(){
    return{
      menu: ["Легкий","Средний","Сложный"],
      sequence: [],
		  copy: [],
		  round: 0,
		  active: true,
      mode: 'normal',
      getMode: "Легкий"

    }
    
  },
  template: `<div class="wrapper">
  <h1>Simon Says</h1>
    <div class="game-board">
      <div class="simon">
        <ul>
          <li class="red" @click="getValueSimon($event.currentTarget)" data-tile="1"></li>
          <li class="blue" @click="getValueSimon($event.currentTarget)" data-tile="2"></li>
          <li class="yellow" @click="getValueSimon($event.currentTarget)" data-tile="3"></li>
          <li class="green" @click="getValueSimon($event.currentTarget)" data-tile="4"></li>
        </ul>
      </div>
    </div>
    <div class="game-info">
      <h2>Round: <span data-round="0">{{round}}</span></h2>
      <button @click="startgame "data-action="start" >Start</button>
      <div class="fail"></div>
    </div>
    <div class="game-options">
      <h2>Game Options:</h2>
      <select v-on:change="changeMod($event.target.value)">
      <option v-for="menus in menu">{{menus}}</option>
    </select>
    </div>
  <div data-action="sound"></div>
 
</div>`,
  methods: {
    startgame(){
      this.sequence = [];
			this.copy = [];
			this.round = 0;
			this.active = true;
      this.newRound();
      this.getMode = this.getMode
    },
    newRound(){
    
      this.sequence = [this.randomNumber()]
      const main = async () =>{
        for(const sequence of this.sequence){
          await this.animate(sequence)
        }
      }
      main()
    
    },
    changeMod(e){
      this.active = false
      this.getMode = e
      this.round = 0
      
    },
    animate(sequence){
      return new Promise((resolve)=>{
        let time;
        if(this.getMode === "Легкий"){
          time = 1500
        }
        if(this.getMode === "Средний"){
          time = 1000
        }
        if(this.getMode === "Сложный"){
          time = 400
        }
        sequence.className +=" tile"
        setTimeout(()=>{
          setTimeout(()=>{
            sequence.className = sequence.className.replace("tile", "")
          },time)
          resolve()
        },time)
      })
    },
    getValueSimon(e){
      this.active = false

     

      if (this.sequence[0] === e){
        this.round = ++this.round
    
        this.newRound()
      

      }else{
        const feil = document.querySelector(".fail").innerHTML = `Вы проиграли, раунды - ${this.round}`
        this.round = 0
        return feil
      }

    },
    randomNumber(){
      this.sequence = document.querySelectorAll("[data-tile]")

      
      
			return this.sequence[parseInt(Math.random()* 4 )];
		}

  }
})
