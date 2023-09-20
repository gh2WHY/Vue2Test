<template>
  <div>
    <input type="file" @change="upload"/>
    <div>
        <div>size:{{size}}</div>
        <div>分辨率:{{px}}</div>
    </div>
  </div>
</template>

<script>
export default {
    name:'imgCheck',
    data(){
        return{
            size:'',
            px:''
        }
    },
    methods:{
        async upload(e){
            const files = e.target.files;
            this.size = (files[0].size / 1024).toFixed(2) + 'kB';
            const fileBase64 = await this.getBase64(files[0]);
            const res = await this.getImgPx(fileBase64);
            this.px = res.width + 'px *' + res.height + 'px';
        },
        getBase64(file){
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise((resolve) => {
                reader.onload = () => {
                    resolve(reader.result);
                };
            });
        },
        getImgPx(img) {
            const image = new Image();
            image.src = img;
            return new Promise((resolve) => {
                image.onload = () => {
                    const width = image.width;
                    const height = image.height;
                    resolve({ width, height });
                };
            });
        },
    }
}
</script>

<style>

</style>