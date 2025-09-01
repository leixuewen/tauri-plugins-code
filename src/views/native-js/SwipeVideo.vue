<script setup>
import { onBeforeMount, ref } from 'vue';

const swipe = ref();
let wheel = null;
function wheelFun(e) {
    // console.log(e.deltaY);

    if (wheel) clearTimeout(wheel);
    wheel = setTimeout(() => {
        if (e.deltaY > 0) {
            swipe.value.next();
        } else {
            swipe.value.prev();
        }
    }, 200);
}

onBeforeMount(() => {
    changeFun(0);
});

let videos = [
    '09/06/80/613871f3cb2d8',
    '15653652/00/30/01/5fa0fc15a3470',
    '15653652/01/00/67/6117b79d71fa8',
    '2418175/00/02/22/5b52e01dad564',
    '2405811/00/34/41/5fcb54f5aa800',
    '2419216/00/01/98/5b544b3e5337c',
    '2629112/00/01/92/5b4d9113bffd1',
    '2405811/00/25/91/5f7181591abbb',
    '10/10/87/7/66f5031700297',
    '2418175/00/02/61/5b835438b2123',
    '2629112/00/02/76/5b8ce0b65a774',
    '09/03/38/632fe23343873',
    '7165162/00/19/39/5f06cfe424c38',
    '2629112/00/03/29/5bc1fe8d802b6',
    '2418175/00/02/04/5b5085d637d83',
    '2629112/00/02/82/5b93d8b92bfab',
    '2405811/00/26/16/5f7418e33dbb7',
    '2414777/00/02/23/5b5303d093761',
    '2269348/00/14/92/5e67a62c6a392',
    '2402760/00/01/73/5b495ddab7660',
    '14490244/00/16/81/5ea9635f1ec32',
    '2269348/00/02/23/5b52ff923e41e',
    '2418175/00/02/24/5b5334eb9f0f5',
];
const videoList = ref([]);
function loadVideo() {
    for (let i = 0; i < 10; i++) {
        let num = Math.floor(Math.random() * videos.length);
        videoList.value.push({
            src: 'https://img.tukuppt.com/video_show/' + videos[num] + '_10s_big.mp4',
            like: num,
            comments: num,
            collection: num,
            share: num,
        });
    }
}

let videoPlayId = "";
let vp = new Map();
let va = false;
function changeFun(_index) {
    console.log(_index);
    if (_index + 3 >= videoList.value.length) {
        loadVideo();
    }
    // 关闭上一个视频
    let v = document.getElementById(videoPlayId);
    if (v) {
        if (!va && !v.paused) { va = true };
        v.pause();
        vp.set(videoPlayId, v);
    }
    // 记录视频id
    let src = videoList.value[_index].src;
    videoList.value[_index].src2 = src;
    videoPlayId = src;
    // 播放当前被暂停的视频
    if (vp.has(src) && va) {
        vp.get(src).play();
    }
}

function videoClick(id) {
    console.log(id);
    let v = document.getElementById(id);
    if (v.paused) {
        v.play();
    } else {
        v.pause();
    }
}

function heart(_item) {
    if (!_item.like_color) {
        _item.like = _item.like + 1;
        _item.like_color = 'red';
    } else {
        _item.like = _item.like - 1;
        _item.like_color = '';
    }
}

function star(_item) {
    if (!_item.collection_color) {
        _item.collection = _item.collection + 1;
        _item.collection_color = 'red';
    } else {
        _item.collection = _item.collection - 1;
        _item.collection_color = '';
    }
}

function share(_item) {
    navigator.share({
        title: '网页标题',
        text: '快来看看这个网页！',
        url: _item.src,
    });
}
</script>
<template>
    <var-swipe ref="swipe" class="swipe-example" @change="changeFun" @wheel="wheelFun" vertical :loop="false"
        :indicator="false">
        <var-swipe-item v-for="item in videoList" :key="item.src">
            <video @touchstart="videoClick(item.src)" :id="item.src" :src="item.src2" autoplay class="video"
                poster="/src/assets/tauri.svg" width="100%" height="100%" controls></video>
            <div class="fab">
                <div class="icon" @click="heart(item)">
                    <var-icon size="36" :color="item.like_color" name="heart" />
                    <div>{{ item.like }}</div>
                </div>
                <div class="icon">
                    <var-icon size="36" name="chat-processing-outline" />
                    <div>{{ item.comments }}</div>
                </div>
                <div class="icon" @click="star(item)">
                    <var-icon size="36" :color="item.collection_color" name="star" />
                    <div>{{ item.collection }}</div>
                </div>
                <div class="icon" @click="share(item)">
                    <var-icon size="36" name="share" />
                    <div>分享</div>
                </div>
            </div>
        </var-swipe-item>
    </var-swipe>
</template>
<style>
.swipe-example {
    height: calc(100vh - 54px);
    position: relative;
    background: rgb(188, 35, 35);
}

.swipe-example .video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.swipe-example .fab {
    position: absolute;
    right: 12px;
    bottom: 90px;
    color: white;
    text-align: center;
    font-size: 12px;
}

.swipe-example .fab .icon {
    margin: 20px 0;
}
</style>