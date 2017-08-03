<template lang="pug">
  div.input-range-container
    md-button.button-range(@click.native="rangeChange(1)")
      md-icon keyboard_arrow_up
    input.input-range(type="text",
            v-model="preparedValue",
            maxlength="2",
            minlength="1",
            :readonly="readonly",
            @keydown.38="rangeChange(1)",
            @keydown.40="rangeChange(-1)"
            @mousewheel="scrollRange")
    md-button.button-range(@click.native="rangeChange(-1)")
      md-icon keyboard_arrow_down
</template>

<script>
  export default {
    name: "inputRange",
    props: {
      value: {
        type: Number
        // required: true
      },
      showButtons: {
        type: Boolean,
        default: () => false
      },
      readonly: {
        type: Boolean,
        default: () => false
      },
      step: {
        type: Number,
        default: () => 1
      }
    },
    computed: {
      preparedValue () {
        return `${this.value.toString().length === 1 ? "0" : ""}${this.value}`;
      }
    },
    methods: {
      rangeChange (way = 1) {
        this.change(this.value + way);
      },
      scrollRange (e) {
        setTimeout(
          this.rangeChange(
            (value => Math.max(-1, Math.min(1, (value.wheelDelta || -value.detail))))(window.event || e)
          ),
        1000);
      },
      change (value) {
        this.$emit("change", value);
      }
    }
  };

</script>

<style lang="scss" scoped>
.input-range-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 50%;
}
.button-range {
  min-width: 94%;
  min-height: 24px;
  padding: 0;
  margin: 0 0 0 5px;
  line-height: 24px;
}
.input-range {
  width: 100%;
  height: 32px;
  min-height: 32px;
  margin-left: 5px;
  color: #6a7682;
  font-size: 12px;
  text-align: center;
  border-radius: 4px;
  border: 0;
  background-color: #e6f2fa;
}
</style>
