<template>
    <div class="full-width navigator">
        <ul>
            <li :class="{active: $route.fullPath === '/homepage'}" @click="$router.push('/homepage')" style="margin-top: 32px;">
                <div class="img-wrapper">
                    <img src="../assets/image/nav_home.png" alt="" style="width: 22px; height: 22px;">
                </div>
                <span>{{ $t('home') }}</span>
            </li>
            <li class="title">
                <span>
                    {{ $t('add to library') }}
                </span>
            </li>
            <li :class="{active: $route.fullPath === '/search'}" @click="$router.push('/search')">
                <div class="img-wrapper">
                    <img src="../assets/image/nav_record.png" alt="" style="width: 23px; height: 23px;">
                </div>
                <span>{{ $t('record new word') }}</span>
            </li>
            <li :class="{active: $route.fullPath === '/quickReview'}" @click="$router.push('/quickReview')">
                <div class="img-wrapper">
                    <img src="../assets/image/nav_calendar.png" alt="" style="width: 23px; height: 22px;">
                </div>
                <span>{{ $t('recent added') }}</span>
            </li>
            <li class="title">
                <span>
                    {{ $t('statistics') }}
                </span>
            </li>
            <li :class="{active: $route.fullPath === '/chart'}" @click="$router.push('/chart')">
                <div class="img-wrapper">
                    <img src="../assets/image/nav_chart.png" alt="" style="width: 24px; height: 22px;">
                </div>
                <span>{{ $t('chart') }}</span>
            </li>
            <li class="title">
                <span>
                    {{ $t('review') }}
                </span>
            </li>
            <li :class="{active: $route.fullPath === '/review/all/true'}" @click="$router.push('/review/all/true')">
                <div class="img-wrapper">
                    <img src="../assets/image/nav_review.png" alt="" style="width: 23px; height: 24px;">
                </div>
                <span>{{ $t('review all') }}</span>
            </li>
            <li :class="{active: $route.fullPath === `/review/scheme/${scheme._id}`}"
                @click="$router.push(`/review/scheme/${scheme._id}`)" v-for="scheme of schemes">
                <div class="img-wrapper">
                    <img src="../assets/image/nav_review.png" alt="" style="width: 23px; height: 24px;">
                </div>
                <span>{{scheme.name}}</span>
                <i class="fa fa-trash operate" @click.stop="$df(removeScheme, scheme.name, scheme)"></i>
            </li>
            <li class="title">
                <span>
                    {{ $t('books') }}
                </span>
                <i class="fa fa-plus-circle menu-action" @click="creatingBook = true"></i>
            </li>
            <li :class="{active: $route.fullPath === '/view/like/true'}" @click="$router.push('/view/like/true')">
                <div class="img-wrapper">
                    <img src="../assets/image/nav_like.png" alt="" style="width: 24px; height: 22px;">
                </div>
                <span>{{ $t('favourite') }}</span>
            </li>
            <li v-if="creatingBook">
                <div class="img-wrapper">
                    <img src="../assets/image/nav_book.png" alt="" style="width: 22px; height: 22px;">
                </div>
                <input @blur="createBook($event.target.value)" @keyup.enter="creatingBook = false" type="text"
                       placeholder="your new book's name"
                       style="height: 26px; width: 160px; padding: 5px; outline: none;">
            </li>
            <li :class="{active: $route.fullPath === `/view/book/${book._id}`}"
                @click="$router.push(`/view/book/${book._id}`)" v-for="book of books">
                <div class="img-wrapper">
                    <img src="../assets/image/nav_book.png" alt="" style="width: 22px; height: 22px;">
                </div>
                <span>{{book.name}}</span>
                <i class="fa fa-trash operate" @click.stop="$df(removeBook, book.name,book)"></i>
            </li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
    import { mapState, mapActions } from 'vuex'

    export default {
        name: 'navigator',
        data () {
            return {
                creatingBook: false
            }
        },
        computed: {
            ...mapState({
                books: state => state.books.books,
                schemes: state => state.schemes.schemes
            })
        },
        methods: {
            ...mapActions({
                postBook: 'books/post',
                _removeBook: 'books/remove',
                _removeScheme: 'schemes/remove'
            }),
            removeBook (...args) {
                this.$router.push('/wordView/like/true')
                this._removeBook(...args)
            },
            removeScheme (...args) {
                this.$router.push('/review/all/true')
                this._removeScheme(...args)
            },
            createBook (name) {
                this.creatingBook = false
                this.postBook(name)
            }
        }
    }
</script>
<style lang="scss">
    .navigator {
        background: var(--bg);
        overflow: scroll;
        user-select: none;
        cursor: default;
        height: calc(100% - 41px);
        ul {
            li {
                margin-top: 20px;
                margin-left: 24px;
                line-height: 24px;
                font-size: 16px;
                display: flex;
                .img-wrapper {
                    width: 24px;
                    height: 24px;
                    margin-right: 18px;
                }
                span {
                    display: block;
                    font-size: 16px;
                    width: 100%;
                    line-height: 24px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: var(--txt-dark);
                }
                &.title {
                    margin-top: 32px;
                    span {
                        color: var(--bg-disabled);
                        font-size: 12px;
                        line-height: 17px;
                    }
                }
                &.active {
                    color: var(--major);
                    font-weight: 600;
                }
                &:hover {
                    .operate {
                        transform: scale(1);
                    }
                }
                .menu-action {
                    font-size: 18px;
                    height: 18px;
                    margin: 6px;
                }
                .operate {
                    transition: transform .2s;
                    transform: scale(0);
                    color: var(--minor);
                    height: 18px;
                    margin: 3px 10px;
                }
            }
        }
    }
</style>
