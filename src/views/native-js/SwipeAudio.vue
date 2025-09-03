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
    '09/01/86/5c8a181d9e6af98360',
    '08/99/26/5c895b6db9ae323407',
    '09/01/11/5c89c0389968591664',
    '08/99/27/5c895c9973d6255415',
    '08/99/26/5c895c95618b455595',
    '09/01/28/5c89d54c4c9b042281',
    '09/00/41/5c89232d12af919710',
    '09/00/60/5c89396dc41ca86334',
    '08/98/74/5c88b75889c744149',
    '00/10/92/5d819c526a25f2183',
    '08/98/46/5c88955d65d7f42617',
    '00/10/94/5d819c5d37b2b11460',
    '08/98/66/5c88acd0307c489066',
    '08/99/02/5c88d829855a520173',
    '08/99/04/5c88d955af89e15439',
];
const videoList = ref([]);
function loadVideo() {
    for (let i = 0; i < 10; i++) {
        let num = Math.floor(Math.random() * videos.length);
        videoList.value.push({
            id: Math.random(),
            src: 'https://img.tukuppt.com/newpreview_music/' + videos[num] + '.mp3',
            name: '@' + num,
            color: 'var(--color-info)',
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
        // 将上一个和下一个设置为暂停图标
        if (va) {
            if (_index > 0) {
                videoList.value[_index - 1].icon = 'play-circle';
            }
            if (_index + 1 < videoList.value.length) {
                videoList.value[_index + 1].icon = 'play-circle';
            }
        }
        vp.set(videoPlayId, v);
    }
    // 记录视频id
    videoList.value[_index].src2 = videoList.value[_index].src;
    videoPlayId = videoList.value[_index].id;
    // 播放当前被暂停的视频
    if (vp.has(videoPlayId) && va) {
        vp.get(videoPlayId).play();
        videoList.value[_index].icon = 'play-circle-outline';
    }
    // 可以执行自动播放时的图标
    if (va) {
        videoList.value[_index].icon = 'play-circle-outline';
    }

}

function audioClick(_item) {
    let v = document.getElementById(_item.id);
    if (v.paused) {
        v.play();
        _item.icon = "play-circle-outline";
    } else {
        v.pause();
        _item.icon = "play-circle";
    }
}

</script>
<template>
    <var-swipe ref="swipe" class="swipe-example" @change="changeFun" @wheel="wheelFun" vertical :loop="false"
        :indicator="false">
        <var-swipe-item v-for="item in videoList" :key="item.src">
            <!-- <var-image src="/assets/tauri.svg" height="46%" /> -->
            <img src="/src/assets/tauri.svg" class="img">
            <div class="btn">
                <var-icon size="24" name="account-circle" />
                <var-icon size="24" name="download-outline" />
                <var-icon size="24" name="heart-outline" />
                <var-icon size="24" name="chat-processing-outline" />
                <var-icon size="24" name="cog-outline" />
            </div>
            <div style="height: 90px;">歌词：</div>
            <audio :id="item.id" :src="item.src2" autoplay class="video" controls></audio>
            <div class="btn">
                <var-icon size="30" name="refresh" />
                <var-icon size="70" name="menu-left" @click="swipe.prev()" />
                <var-icon size="70" :name="item.icon || 'play-circle'" @click="audioClick(item)" />
                <var-icon size="70" name="menu-right" @click="swipe.next()" />
                <var-icon size="30" name="format-list-checkbox" />
            </div>
        </var-swipe-item>
    </var-swipe>
</template>
<style scoped>
.swipe-example {
    height: calc(100vh - 54px);
    padding: 12px;
    color: var(--card-content-color);
}

.swipe-example .img {
    height: 46%;
    display: block;
    margin: auto;
}

.swipe-example .video {
    width: 100%;
}

.swipe-example .btn {
    padding: 12px 0;
    display: flex;
    justify-content: space-between;
}
</style>