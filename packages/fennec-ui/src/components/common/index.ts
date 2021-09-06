import Vue from "vue";
import upperFirst from "lodash/upperFirst";

const requireComponent = require.context("./", true, /\.vue/);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(
    fileName.replace(/^\.\//, "").replace(/\.\w+$/, "")
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});
