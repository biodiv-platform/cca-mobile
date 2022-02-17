export const selectStyles = {
  control: (p) => ({
    ...p,
    cursor: "text",
    borderColor: "var(--chakra-colors-gray-300)"
  }),
  placeholder: (p) => ({
    ...p,
    color: "#757474"
  }),
  valueContainer: (p) => ({ ...p, height: "38px" }),
  menu: (p) => ({ ...p, minWidth: "20em" }),
  menuPortal: (p) => ({ ...p, zIndex: 1900 }),
  clearIndicator: (base, state) => ({
    ...base,
    cursor: "pointer",
    color: state.isFocused ? "blue" : "black"
  })
};
