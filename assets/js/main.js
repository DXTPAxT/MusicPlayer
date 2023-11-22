const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player');
const heading = $('h1');
const subHeading = $('.cd-singer h4');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd'); 
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const prevBtn = $('.btn-prev');
const nextBtn = $('.btn-next');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playlist = $('.playlist')

const app = {
    currentIndex: 0,        
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [ 
        {
            name: 'Bạn đời',
            singer: 'Karik ft GDucky',
            path: 'assets/music/Bạn đời.mp4',
            image: 'assets/img/Bạn đời.jpg'
        },
        {
            name: 'Cuộc sống xa nhà',
            singer: 'MINH VƯƠNG M4U',
            path: 'assets/music/CUỘC SỐNG XA NHÀ.mp4',
            image: 'assets/img/Cuộc sống xa nhà.jpg'
        },
        {
            name: 'Ba kể con nghe',
            singer: 'Dương Trần Nghĩa',
            path: 'assets/music/Ba kể con nghe.mp4',
            image: 'assets/img/Ba kể con nghe.jpg'
        },
        {
            name: 'Lớn rồi còn khóc nhè',
            singer: 'Trúc Nhân',
            path: 'assets/music/Lớn rồi còn khóc nhè.mp4',
            image: 'assets/img/Lớn rồi còn khóc nhè.jpg'
        },
        {
            name: 'Baby gọi cho anh',
            singer: 'Captain, Umie',
            path: 'assets/music/baby gọi cho a.mp4',
            image: 'assets/img/Baby gọi cho anh.jpg'
        },
        {
            name: 'Ánh sao và bầu trời',
            singer: 'T.R.I x Cá',
            path: 'assets/music/Ánh sao và bầu trời.mp4',
            image: 'assets/img/Ánh sao và bầu trời.jpg'
        },
        {
            name: 'Cô đơn không muốn về nhà',
            singer: 'Mr.Siro',
            path: 'assets/music/Cô đơn không muốn về nhà.mp4',
            image: 'assets/img/Cô đơn không muốn về nhà.jpg'
        },
        {
            name: 'Ngổn ngang',
            singer: 'Rhymastic',
            path: 'assets/music/Ngổn ngang.mp4',
            image: 'assets/img/Ngổn ngang.jpg'
        },
        {
            name: 'Chuyện đôi ta',
            singer: 'Emcee L ft Muộii',
            path: 'assets/music/Chuyện đôi ta.mp4',
            image: 'assets/img/Chuyện đôi ta.jpg'
        },
        {
            name: 'Paris in the rain',
            singer: 'Lauv',
            path: 'assets/music/Paris In The Rain.mp4',
            image: 'assets/img/Paris in the rain.jpg'
        },
        {
            name: 'I like me better',
            singer: 'Lauv',
            path: 'assets/music/I Like me Better.mp4',
            image: 'assets/img/I like me better.jpg'
        },
        {
            name: 'Closer',
            singer: 'The Chainsmokers ft. Halsey',
            path: 'assets/music/Closer.mp4',
            image: 'assets/img/Closer.png'
        }
    ],

    render: function () {
        const htmls = this.songs.map((song,index) => {
            return `
                <div class="song song${index} " data-index="${index}"> 
                    <div class="thumb" 
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>  
                </div>
                `
        });
        playlist.innerHTML = htmls.join('')
    },

    defineProperties: function() {
        Object.defineProperty(this,'currentSong',{
            get: function () {
                return this.songs[this.currentIndex];
            }   
        })
    },

    handleEvents: function () {  
        const _this = this; 
        const cdWidth = cd.offsetWidth;

        // Xử lý quay cd
        const cdAnimate = cdThumb.animate([
            { transform: 'rotate(100000012deg)'}
        ],  {   
                duration: 4000000000,
        })

        cdAnimate.pause();

        // Xử lý phóng to thu nhỏ cd
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop ;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth/cdWidth
        }

        // Xử lý play
        playBtn.onclick = function() {
            if(_this.isPlaying) {
                audio.pause();
                _this.isPlaying = false;
                player.classList.remove ('playing')
            } else {
                audio.play();
            }
        }

        // Khi play 
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdAnimate.play()
        }

        // Khi pause 
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing') ;
            cdAnimate.pause()
        }

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            setTimeout(function() {
                if (audio.duration) {
                    const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                    progress.value = progressPercent
                }
            },200); 
        }

        // Xử lý khi tua
        progress.oninput = function (e) {
            const seekTime = e.target.value / 100 * audio.duration;
            audio.currentTime = seekTime;
        }

        // Xử lý khi sang bài tiếp theo 
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            audio.play()
        }

        // Xử lý khi sang bài trước đó 
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            audio.play()
        }

        //Xử lý random
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle('active',_this.isRandom);
            if (_this.isRepeat) {
                _this.isRepeat = !_this.isRepeat;
                repeatBtn.classList.remove('active');
            }
        }

        // Xử lý repeat 
        repeatBtn.onclick = function() { 
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle('active',_this.isRepeat);
            if (_this.isRandom) {
                _this.isRandom = !_this.isRandom;
                randomBtn.classList.remove('active');
            }
        }
         
        //Xử lý next song khi audio end
        audio.onended = function() {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else if (_this.isRepeat) {
                audio.play();
            } else {
                _this.nextSong();
            }
            audio.play();
        }   

        // Xử lý khi chọn bài khác trong playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')

            if (songNode || e.target.closest('.option')) {
                if (songNode) {
                    _this.currentIndex = songNode.dataset.index;
                    _this.loadCurrentSong();
                    audio.play();
                }

                if(e.target.closest('.option')) {   
                    console.log(e.target);
                }
            }
        }

    }, 

    loadCurrentSong: function() {
        var activeSong = $(`.song${this.currentIndex}`);
        for (var i = 0; i < this.songs.length; i++) {
            $(`.song${i}`).classList.remove('active')
        };
        activeSong.classList.add('active');
        heading.textContent = this.currentSong.name;
        subHeading.textContent = this.currentSong.singer;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },

    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {   
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    playRandomSong: function() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * this.songs.length);
        } while (randomIndex === this.currentIndex);
        
        this.currentIndex = randomIndex;
        this.loadCurrentSong();
    },

    start: function() {
        this.defineProperties();
        
        this.render();
        
        this.handleEvents();
        
        this.loadCurrentSong();

    }
}

app.start()

