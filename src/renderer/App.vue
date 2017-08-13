<template>
    <div id='app'>
        <router-view></router-view>
    </div>
</template>

<script>
  export default {
    name: 'vocabook'
  }
</script>

<style lang="scss">
    /* global css */
    @import '../../node_modules/font-awesome/css/font-awesome.css';
    @import '../../node_modules/normalize.css/normalize.css';

    html, body, #app {
        height: 100%;
    }

    /* app-related css have 'app-' prefix */
    .app-drag {
        -webkit-app-region: drag;
        -webkit-user-select: none;
    }

    .app-non-drag {
        -webkit-app-region: no-drag;
    }

    /* common css */
    .hand {
        cursor: pointer;
    }
    .full-height {
        height: 100%;
    }

    .full-width {
        width: 100%;
    }

    .clearfix {
        &:after {
            display: block;
            clear: both;
            content: "";
        }
    }
</style>
