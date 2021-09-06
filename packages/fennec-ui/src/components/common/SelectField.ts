import "./SelectField.scss";
import { Component, Mixins } from "vue-property-decorator";
import { VFlex, VIcon, VInput } from "vuetify/lib";

@Component
class SelectField extends Mixins(VInput) {
  get classes() {
    return {
      ...(VInput as any).options.computed.classes.call(this),
      "select-field": true
    };
  }

  genContent() {
    return [this.genControl(), this.genAppendSlot()];
  }

  genControl() {
    const h = this.$createElement;

    return h("div", { class: { "select-field--control": true } }, [
      h(VFlex),
      this.$slots.default
    ]);
  }

  genAppendSlot() {
    const h = this.$createElement;
    const vm = this as any;
    const showClear = vm.clearable && !!vm.value;

    const clear = (e: any) => {
      vm.value = "";
      vm.$emit("clear");
      e.stopPropagation();
    };

    return h("div", [
      showClear &&
        h(
          VIcon,
          { staticClass: "mr-2", props: { size: 12 }, on: { click: clear } },
          "$clear"
        ),
      h(VIcon, "$FIconChevronRight")
    ]);
  }
}

export default SelectField;
