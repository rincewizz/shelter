let pets = [
    {
      "name": "Jennifer",
      "img": "assets/images/pets-jennifer.jpg",
      "type": "Dog",
      "breed": "Labrador",
      "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
      "age": "2 months",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Sophia",
      "img": "assets/images/pets-sophia.jpg",
      "type": "Dog",
      "breed": "Shih tzu",
      "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
      "age": "1 month",
      "inoculations": ["parvovirus"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Woody",
      "img": "assets/images/pets-woody.jpg",
      "type": "Dog",
      "breed": "Golden Retriever",
      "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
      "age": "3 years 6 months",
      "inoculations": ["adenovirus", "distemper"],
      "diseases": ["right back leg mobility reduced"],
      "parasites": ["none"]
    },
    {
      "name": "Scarlett",
      "img": "assets/images/pets-scarlet.jpg",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
      "age": "3 months",
      "inoculations": ["parainfluenza"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Katrine",
      "img": "assets/images/pets-katrine.jpg",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
      "age": "6 months",
      "inoculations": ["panleukopenia"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Timmy",
      "img": "assets/images/pets-timmy.jpg",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
      "age": "2 years 3 months",
      "inoculations": ["calicivirus", "viral rhinotracheitis"],
      "diseases": ["kidney stones"],
      "parasites": ["none"]
    },
    {
      "name": "Freddie",
      "img": "assets/images/pets-freddie.jpg",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
      "age": "2 months",
      "inoculations": ["rabies"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Charly",
      "img": "assets/images/pets-charly.jpg",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      "age": "8 years",
      "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
      "diseases": ["deafness", "blindness"],
      "parasites": ["lice", "fleas"]
    }
  ];


class Carousel{
    
    constructor(selector, itemsObj){
        
        this.carousel = document.querySelector(selector);
        this.items = this.carousel.querySelector(".carousel__items");
        this.left = this.carousel.querySelector(".carousel__arrow--left");
        this.right = this.carousel.querySelector(".carousel__arrow--right");
        this.left.addEventListener("click", () => this.prev() );
        this.right.addEventListener("click", () => this.next() );
        this.itemsObj = itemsObj;
        this.count=this.getCount();
        this.currentItemsId = [];
        this.nextItemsId = [];
        this.sliding=false;
        this.side="";
        this.throttled = false

        this.items.addEventListener("transitionend", (e) => {
            if(e.target.classList.contains("carousel__items") && this.sliding){
 
                this.sliding=false;
                this.items.style.transform="";
                this.items.classList.remove("carousel__items--sliding");

                if(this.side=="left"){
                    let lastIndex = this.items.children.length-1;
                    for(let i = lastIndex; i>lastIndex-this.count*2 ;i--){
                        this.items.children[i].remove();
                    }
                }else{
                    for(let i = 0; i<this.count*2; i++){
                        this.items.children[0].remove();
                    }
                }

                this.addNextItems();
            }

        });        
        
        window.addEventListener('resize', () => {
            
            if (!this.throttled) {
                
                let count = this.getCount();
                if(count!=this.count){
                    this.count=count;
                    this.render();
                }
                this.throttled = true;
              setTimeout(() => {
                this.throttled = false;
              }, 3);
            }  
          });


        this.render();
    }
    getCount(){
        if(document.documentElement.clientWidth>991){
            return 3;
        }else if(document.documentElement.clientWidth>766){
            return 2;
        }            
        return 1;                
    }
    getCard(card){
        return `
        <div class="carousel__item">
        <div class="our-friends__card pet-card">
          <div class="pet-card__img"><img width="270" height="270" src="${card.img}" alt=""></div>
          <div class="pet-card__name">${card.name}</div>
          <button class="button button--light pet-card__more">Learn more</button>
        </div>
        </div>
        `
    }
    render(){
        Array.from(document.querySelector(".carousel__items").children).forEach( el => el.remove());

        this.currentItemsId=[];
        this.nextItemsId=[];
        this.addCurrentItems();
        this.addNextItems();
    }
    next(){        
        this.sliding=true;
        this.side="right";
        this.currentItemsId=this.nextItemsId;
        this.nextItemsId=[];
        
        this.items.classList.add("carousel__items--sliding");
        this.items.style.transform="translateX(-200%)";
    }
    prev(){      
        this.sliding=true;
        this.side="left";
        this.currentItemsId=this.nextItemsId;
        this.nextItemsId=[];

        this.items.style.transform="translateX(0%)";
        this.items.classList.add("carousel__items--sliding");
    }
    _getRandom(){
        return Math.floor(Math.random() * pets.length);
    }
    _generateCurrentItems(){
        while (this.currentItemsId.length !== this.count) {
            let index = this._getRandom();
            if (this.currentItemsId.indexOf(index) === -1) {
                this.currentItemsId.push(index);
            }
        }
    }
    _generateNextItems(){
        while (this.nextItemsId.length !== this.count) {
            let index = this._getRandom();
            if (this.currentItemsId.indexOf(index) === -1 && this.nextItemsId.indexOf(index) === -1) {
                this.nextItemsId.push(index);
            }
        }
    }
    addNextItems(){
        this._generateNextItems();

        for(let i=0; i<this.count; i++){
            let card = pets[this.nextItemsId[i]];
            this.items.insertAdjacentHTML("afterbegin", this.getCard(card));
            this.items.insertAdjacentHTML("beforeend", this.getCard(card));
        }
    }
    addCurrentItems(){
        this._generateCurrentItems();
        for(let i=0; i<this.count; i++){
            let card = pets[this.currentItemsId[i]];
            this.items.insertAdjacentHTML("beforeend", this.getCard(card));
        }
    }

}

function changeMobileMenu(){

    const burger = document.querySelector(".burger");
    const menu =  document.querySelector(".header .menu");
    const overflow = document.querySelector(".header__overflow");

    burger.classList.toggle("burger--open");
    menu.classList.toggle("menu--open");
    overflow.classList.toggle("header__overflow--open");
    document.body.classList.toggle("body--noscroll");

}

function initMobileMenu(){

    const burger = document.querySelector(".burger");
    const overflow = document.querySelector(".header__overflow");

    const menuItems = document.querySelector(".menu__items");

    [burger, overflow].forEach( 
        el => el.addEventListener("click", () => {
            changeMobileMenu();
        }) 
    );

    menuItems.addEventListener("click", e => {
        if(e.target.classList.contains("menu__link"))
            changeMobileMenu();
    }) 

}

function init(){
    initMobileMenu();

    if( document.querySelector(".carousel") ){
        let carousel = new Carousel(".carousel", pets);
    }
    
}

init();