<template>
  <div>
    <button @click="setReadOnly(!isReadOnly)">
      {{ isReadOnly ? "ReadOnly" : "Allowed" }}
    </button>
    <div id="webviewer" ref="viewer"></div>
  </div>
</template>

<script>
import WebViewer from "@pdftron/webviewer";

export default {
  name: "WebViewer",
  props: { initialDoc: { type: String } },
  data() {
    return {
      isReadOnly: true,
    };
  },
  mounted() {
    const viewer = this.$refs["viewer"];

    const path = `${process.env.BASE_URL}webviewer`;
    console.dbg("start load");
    WebViewer(
      {
        path,
      },
      viewer
    ).then((instance) => {
      this.instance = instance;

      instance.loadDocument(this.initialDoc, {
        withCredentials: true,
      });

      instance.docViewer.one("documentLoaded", () => {
        console.dbg("document loaded");
      });

      instance.docViewer.one("annotationsLoaded", () => {
        console.dbg("annotations loaded");

        const showBug = true;
        if (showBug) {
          // !!! Without a timeout 99% of the times the last date fields are buggy after made "readonly"
          this.setReadOnly(true);
        } else {
          // with some timeout they are OK, but this is very inconsistent, 100ms may also work
          // nut in readl app even 400ms sometimes don't patch the bug
          setTimeout(() => {
            this.setReadOnly(true);
          }, 500);
        }
      });
    });
  },
  methods: {
    setReadOnly(isReadOnly) {
      this.isReadOnly = isReadOnly;

      const checkField = function (/*Annotations.Forms.Field*/ field) {
        field.flags.set("ReadOnly", isReadOnly);
        // Check children fields
        field.children.forEach(checkField);
      };
      const annotManager = this.instance.docViewer.getAnnotationManager();

      annotManager.getFieldManager().forEachField(checkField);
    },
  },
};
</script>

<style>
#webviewer {
  height: 800px;
}
</style>
