import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Title",
  props: {
    onTitleClick: Function as PropType<(event: MouseEvent) => void>,
    title: {
      default: "This is title.",
      require: false,
      type: String
    }
  },
  setup(props, context) {
    return () => (
      <>
        <h1
          class="title"
          onClick={(event: MouseEvent) => context.emit("title-click", event)}
        >
          {props.title}
        </h1>
      </>
    );
  }
});
