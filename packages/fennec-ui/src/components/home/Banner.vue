<template>
  <div v-if="showBanner" class="banner-wrap">
    <div v-if="!fullDisplay" class="banner">
      <div
        class="banner-content"
        @click="handleShowDetail"
        v-html="meta.brief || bodyStr"
      />

      <span
        v-if="attrs && attrs.action_type"
        class="banner-action"
        @click="handleClickActionBtn"
      >
        {{ meta.actionLabel }}
      </span>
    </div>

    <div v-if="fullDisplay" class="banner banner__full">
      <div class="markdown-here-wrapper">
        <div class="banner-title">{{ meta.title }}</div>
        <div class="banner-body" v-html="bodyMd"></div>
      </div>
    </div>

    <f-bottom-sheet v-model="dialog">
      <v-card flat>
        <div class="text-center">
          <div class="banner-title">{{ meta.title }}</div>
        </div>

        <v-card-text class="markdown-here-wrapper">
          <div class="banner-body" v-html="bodyMd"></div>
        </v-card-text>
      </v-card>
    </f-bottom-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import fm from "front-matter";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

@Component
class Banner extends Vue {
  banner: any = null;

  dialog = false;
  attrs: any = null;
  bodyStr: any = null;
  bodyMd: any = null;

  get fullDisplay() {
    return this.$route.name === "deposit";
  }

  get showBanner() {
    return this.banner?.value;
  }

  get meta() {
    const date = this.attrs?.date;
    const dateText = date ? new Date(date).toLocaleString() : "";

    return {
      title: this.attrs?.title ?? "",
      brief: this.attrs?.brief ?? "",
      author: this.attrs?.author_title ?? "",
      avatar: this.attrs?.author_image_url ?? "",
      actionLabel: this.attrs?.action_label ?? "",
      date: dateText
    };
  }

  async mounted() {
    try {
      const url = "https://announcements.pando.im/state.json";
      const resp = await axios.get(url);

      this.banner = resp.data?.fennec?.banners;

      if (this.banner.value) {
        this.loadDocument();
      }
    } catch (error) {
      // ignore
    }
  }

  async loadDocument() {
    try {
      const document = this.banner?.document ?? null;

      if (!document) return;

      const locale = this.$i18n.locale;
      const localeMap = {
        en: "en",
        de: "en",
        es: "en",
        fr: "en",
        ja: "en",
        ko: "en",
        zh: "zh"
      };
      const resp = await axios.get(document[localeMap[locale]]);

      const { attributes, body: _boby } = fm(resp.data);

      this.attrs = attributes as any;
      this.bodyStr = _boby;
      this.bodyMd = md.render(_boby);
    } catch (error) {
      console.log(error);
    }
  }

  handleShowDetail() {
    this.dialog = true;
  }

  handleClickActionBtn() {
    if (this.attrs.action_type === "specific") {
      // TODO: handle specific action
    } else if (this.attrs.action_type === "redirect") {
      window.open(
        this.attrs.action_redirect_url || this.attrs.action_redirect_path,
        "_blank"
      );
    }
  }
}
export default Banner;
</script>

<style lang="scss" scoped>
.banner {
  height: 48px;
  padding: 16px;
  border-radius: 16px;
  font-size: 14px;
  display: flex;
  align-items: center;
  background-color: #fff1cc;
  color: #b45309;

  .banner-content {
    padding-right: 20px;
    line-height: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
}

.banner.banner__full {
  height: auto;

  .banner-title {
    font-size: 16px;
    font-weight: 500;
    padding: 0;
  }
}

.banner-action {
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  white-space: nowrap;
}

.banner-title {
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 80%;
  padding: 16px;
  display: inline-block;
}

.banner-body {
  max-height: 420px;
  overflow: auto;
}
</style>
