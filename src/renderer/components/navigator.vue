<style lang="scss">
    .navigator {
        background: var(--bg);
        overflow: scroll;
        user-select: none;
        cursor: default;
        ul {
            li {
                line-height: 30px;
                text-indent: 15px;
                font-size: 13px;
                font-weight: 500;
                margin-left: 1px;
                border-left: 3px solid var(--bg);
                i {
                    text-indent: 0;
                }
                span {
                    padding-left: 5px;
                }
                &.title {
                    line-height: 20px;
                    color: #999999;
                    font-size: 12px;
                    padding-top: 15px;
                    text-indent: 2px;
                    &:first-child {
                        padding-top: 2px;
                    }
                }
                &.active {
                    border-left: 3px solid var(--minor);
                    background: var(--bg-active);
                    color: var(--txt-dark);
                }
                &:hover {
                    .operate {
                        transform: scale(1);
                    }
                }
                .menu-action {
                    font-size: 17px;
                    float: right;
                    padding-right: 12px;
                }
                .operate {
                    transition: transform .2s;
                    transform: scale(0);
                    float: right;
                    padding: 8px 12px;
                }
            }
        }
    }
</style>
<template>
    <div class="full-height pull-left full-width navigator">
        <ul>
            <li class="title">
                <span>recommended</span>
            </li>
            <li :class="{active: cur === 'home'}" @click="cur = 'home'">
                <i class="fa fa-home"></i>
                <span>home</span>
            </li>
            <li :class="{active: cur === 'github'}" @click="toUrl('github', 'https', 'github.com')">
                <i class="fa fa-github"></i>
                <span>github</span>
            </li>
            <li :class="{active: cur === 'twitter'}" @click="toUrl('twitter', 'https', 'twitter.com')">
                <i class="fa fa-twitter"></i>
                <span>twitter</span>
            </li>
            <li :class="{active: cur === 'medium'}" @click="toUrl('medium', 'https', 'medium.com')">
                <i class="fa fa-medium"></i>
                <span>medium</span>
            </li>
            <li class="title">
                <span>dictionary</span>
            </li>
            <li :class="{active: cur === 'dictcn'}" @click="toUrl('dictcn', 'http', 'dict.cn')">
                <i class="fa fa-book"></i>
                <span>dict.cn</span>
            </li>
            <li class="title">
                <span>
                    add to library
                </span>
            </li>
            <li :class="{active: cur === 'search'}" @click="cur = 'search', $router.push('/search')">
                <i class="fa fa-search"></i>
                <span>record new word</span>
            </li>
            <li :class="{active: cur === 'quickReview'}" @click="cur = 'quickReview', $router.push('/quickReview')">
                <i class="fa fa-edit"></i>
                <span>recent added</span>
            </li>
            <li class="title">
                <span>
                    statistics
                </span>
            </li>
            <li :class="{active: cur === 'chart'}" @click="cur = 'chart', $router.push('/chart')">
                <i class="fa fa-line-chart"></i>
                <span>chart</span>
            </li>
            <li class="title">
                <span>
                    review
                </span>
            </li>
            <li :class="{active: cur === 'review'}" @click="cur = 'review', $router.push('/review')">
                <i class="fa fa-calendar"></i>
                <span>review</span>
            </li>
            <li class="title">
                <span>
                    books
                </span>
                <i class="fa fa-plus-circle menu-action" @click="creatingBook = true"></i>
            </li>
            <li :class="{active: cur === 'favourite'}" @click="cur = 'favourite', $router.push('/view/like/true')">
                <i class="fa fa-heart-o"></i>
                <span>favourite</span>
            </li>
            <li v-if="creatingBook">
                <i class="fa fa-list"></i>
                <input @blur="createBook($event.target.value)" @keyup.enter="creatingBook = false" type="text"
                       placeholder="your new book's name" style="height: 26px; width: 160px; padding: 5px;">
            </li>
            <li :class="{active: cur === `book${book._id}`}" @click="cur = `book${book._id}`, $router.push(`/view/book/${book._id}`)" v-for="book of books">
                <i class="fa fa-list"></i>
                <span>{{book.name}}</span>
                <i class="fa fa-trash operate" @click="remove(book)"></i>
            </li>
        </ul>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: 'navigator',
        data () {
            return {
                cur: 'home',
                creatingBook: false
            }
        },
        computed: {
            ...mapState({
                books: state => state.books.books
            })
        },
        methods: {
            ...mapActions({
                postBook: 'books/post',
                remove: 'books/remove'
            }),
            toUrl (tag, protocal, url) {
                this.cur = tag
                this.$router.push(`/url/${protocal}/${url}`)
            },
            createBook (name) {
                this.creatingBook = false
                this.postBook(name)
            }
        }
    }
</script>
