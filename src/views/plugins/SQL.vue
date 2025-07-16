<script setup>
import Database from '@tauri-apps/plugin-sql';
import { Snackbar } from '@varlet/ui';
import { onMounted, onUnmounted, ref } from 'vue';
const DB = ref(new Database());
const result = ref();
const selectResult = ref([]);

onMounted(async () => {
    DB.value = await Database.load('sqlite:mydatabase.db');
});

onUnmounted(() => {
    DB.value.close();
})

function INSERT(todos = {}) {
    DB.value.execute(
        "INSERT into todos (id, title, status) VALUES ($1, $2, $3)",
        [todos.id, todos.title, todos.status],
    ).then(res => {
        result.value = res;
    }).catch(err => {
        Snackbar.error(err);
    })
}

function UPDATE(todos = {}) {
    DB.value.execute(
        "UPDATE todos SET title = $1, status = $2 WHERE id = $3",
        [todos.title, todos.status, todos.id],
    ).then(res => {
        result.value = res;
    }).catch(err => {
        Snackbar.error(err);
    })
}

async function load() {
    try {
        await DB.value.close();
        DB.value = await Database.load('sqlite:test.db');
        await DB.value.execute("CREATE TABLE todos (id INTEGER PRIMARY KEY, title TEXT, status TEXT)");
    } catch (err) {
        Snackbar.error(err);
    }
}

function select() {
    // DB.value.select("SELECT * from todos WHERE id = ?", [id]);
    DB.value.select("SELECT * from todos").then(res => {
        selectResult.value = res;
        // console.log(res);
    })
}

function delect(id) {
    DB.value.execute("DELETE FROM todos WHERE id = ?", [id]).then(res => {
        // console.log(res);
        result.value = res;
    }).catch(err => {
        Snackbar.error(err);
    })
}

</script>
<template>
    <var-card :title="'SQLite: ' + DB.path">
        <var-button type="primary" block @click="load">load sqlite:test.db </var-button>
        <var-button type="primary" block @click="INSERT({ title: 'title', status: 'status', id: '1' })">INSERT
            INTO</var-button>
        <var-button type="primary" block
            @click="UPDATE({ title: 'title', status: 'status', id: '1' })">UPDATE</var-button>
        <var-button type="primary" block @click="select"> select </var-button>
        <var-button type="primary" block @click="delect(1)"> delect </var-button>
        <var-cell :description="JSON.stringify(result)" />
        <var-cell v-for="item of selectResult" :description="JSON.stringify(item)" />
    </var-card>
</template>