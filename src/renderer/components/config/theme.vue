<style lang="scss">
    .config-theme {
        padding: 10px;
        .ct-item {
            float: left;
            width: 50px;
            height: 65px;
            box-shadow: 0 0 10px rgba(0, 0, 0, .5);
            margin: 2px;
            cursor: pointer;
            text-align: center;
            &.active {
                box-shadow: inset 0 0 10px rgba(0, 0, 0, .8);
            }
            .ct-color {
                width: 40px;
                height: 40px;
                margin: 5px 5px;
            }
            .ct-txt {
                font-weight: bold;
            }
        }
    }
</style>
<template>
    <div class="config-theme clearfix">
        <div class="ct-item" :class="{active : theme === 'original'}" @click="setTheme('original')">
            <div class="ct-color" style="background: white">

            </div>
            <span class="ct-txt">
                original
            </span>
        </div>
        <div class="ct-item" :class="{active : theme === 'red'}" @click="setTheme('red')">
            <div class="ct-color" style="background: #b72712">

            </div>
            <span class="ct-txt">
                red
            </span>
        </div>
        <div class="ct-item" :class="{active : theme === 'night'}" @click="setTheme('night')">
            <div class="ct-color" style="background: gray">

            </div>
            <span class="ct-txt">
                night
            </span>
        </div>
        <div class="ct-item" :class="{active : theme === 'bright'}" @click="setTheme('bright')">
            <div class="ct-color" style="background: deepskyblue">

            </div>
            <span class="ct-txt">
                bright
            </span>
        </div>
    </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapState({
        theme: state => state.config.theme
      })
    },
    methods: {
      ...mapActions({
        _setTheme: 'config/setTheme'
      }),
      setTheme (pl) {
        this._setTheme(pl)
      }
    }
  }
</script>
