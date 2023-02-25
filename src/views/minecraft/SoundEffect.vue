<template>
    <div class="sound-effect" :style="{ cursor: loading ? 'wait' : 'unset' }">
        <div>
            <div>
                <input name="snapshot" type="checkbox" v-model="snapshot">
                <label for="snapshot">快照版本</label>
            </div>
            <div class="form-item">
                <label for="version">游戏版本:</label>
                <select v-model="version" name="version">
                    <template v-for="v in versions" v-if="versions">
                        <option v-if="v.type === 'release' || snapshot" :value="v" v-text="v.id"></option>
                    </template>
                </select>
            </div>
            <div class="form-item">
                <label for="source">下载源:</label>
                <select v-model="downloadSource">
                    <option v-for="s in downloadSources" :value="s" v-text="s.name" :disabled="s.disabled"></option>
                </select>
            </div>
            <div @click="audio.pause()">停止播放</div>
        </div>
        <br>
        <div v-for="soundeffect in soundList">
            <span class="sound-effect-entry" v-text="soundeffect.name" @click="sound(soundeffect.hash)"></span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { AssetIndex, CustomAssetEntry, MeteData, MeteDataVersion, Version, downloadSources } from './SoundEffect'

const versions = ref<MeteData["versions"]>([])
const version = ref<MeteDataVersion>()
const snapshot = ref(false)
const soundList = ref<CustomAssetEntry[]>([])
const downloadSource = ref(downloadSources[0])

watch(downloadSource, () => getVersionList())

watch(version, async () => {
    const resp = await fetch(version.value!.url)
    const data: Version = await resp.json()
    const assetResp = await fetch(data.assetIndex.url)
    const assetData: AssetIndex = await assetResp.json()
    soundList.value = Object.entries(assetData.objects)
        .filter(entry => entry[0].endsWith(".ogg"))
        .flatMap(entry => ({
            name: entry[0],
            ...entry[1]
        }))
})

const getVersionList = async () => {
    const resp = await fetch(downloadSource.value.versionManifestV2Url)
    const data = await resp.json()
    versions.value = data.versions
    for (const v of versions.value) {
        if (v.type === 'release') {
            version.value = v
            break
        }
    }
}
getVersionList()

const loading = ref(false)
const audio = new Audio()
audio.onloadstart = () => {
    loading.value = true
}
audio.onloadeddata = () => {
    loading.value = false
}
const sound = (hash: string) => {
    audio.src = `${downloadSource.value.assetBaseUrl}/${hash.substring(0, 2)}/${hash}`
    audio.play()
}
</script>
<style>
.sound-effect {
    width: 100%;
    height: 100%
}

.sound-effect .form-item label {
    margin-right: 10px
}

.sound-effect-entry {
    cursor: v-bind("loading ? 'wait' : 'pointer'")
}
</style>