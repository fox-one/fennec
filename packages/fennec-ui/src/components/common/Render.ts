export default {
  functional: true,
  render: (h, { props }) => {
    if (!props.nodes) return h(null);

    return [props.nodes];
  }
};
