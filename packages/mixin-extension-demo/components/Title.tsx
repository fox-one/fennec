import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Title",
  props: {
    title: {
      type: String,
      require: false,
      default: "This is title."
    },
    onTitleClick: Function as PropType<(event: MouseEvent) => void>
  },
  setup(props, context) {
    return () => (
      <>
        <h1 class="title" onClick={(event: MouseEvent) => context.emit("title-click", event)}>
          {props.title}
        </h1>
      </>
    );
  }
});
