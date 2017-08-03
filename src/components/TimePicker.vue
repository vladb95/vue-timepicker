<template lang="pug">
  .timerange
    input-range(v-model="hours",
              @change="changeHours",
              :readonly="readonly")
    input-range(v-model="minutes",
              @change="changeMinutes",
              :readonly="readonly")
    input-range(v-model="seconds",
              v-if="showSeconds",
              @change="changeSeconds",
              :readonly="readonly")
    md-button-toggle
      md-button.button-toggle(:class="{'md-toggle': isPM}", @click.native="changeType()") {{ isPM ? "PM" : "AM" }}
</template>

<script>
  import inputRange from "./InputRange.vue";

  export default {
    name: "timePicker",
    components: {
      inputRange
    },
    props: {
      value: {
        type: String,
        required: true
      },
      showSeconds: {
        type: Boolean,
        default: () => false
      },
      showSeparator: {
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
      },
      secondStep: {
        type: Number,
        default: () => 1
      }
    },
    watch: {
      value: function (value) {
        this.prepareDate();
      }
    },
    data () {
      return {
        temporalDate: null,
        isPM: false,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    },
    methods: {
      changeHours (value) {
        if (value <= 0 || value > 12) {
          this.isPM = !this.isPM;
          value = value <= 0 ? 12 : 1;
        }
        this.hours = value;
        this.temporalDate.setHours(this.isPM ? this.hours + 12 : this.hours);
        this.emitChanges();
      },

      changeMinutes (value) {
        if (value <= 0 || value >= 60) {
          this.changeHours(value <= 0 ? --this.hours : ++this.hours);
          value = value <= 0 ? (60 - this.step) : 1;
        }
        this.minutes = value;
        this.temporalDate.setMinutes(this.minutes);
        this.emitChanges();
      },

      changeSeconds (value) {
        if (value <= 0 || value >= 60) {
          this.changeMinutes(value <= 0 ? --this.minutes : ++this.minutes);
          value = value <= 0 ? (60 - this.secondStep) : 1;
        }
        this.seconds = value;
        this.temporalDate.setSeconds(this.seconds);
        this.emitChanges();
      },

      changeType () {
        this.isPM = !this.isPM;
        this.isPM && (this.temporalDate.setHours(this.hours + 12));
        this.emitChanges();
      },

      emitChanges () {
        this.$emit("input", this.temporalDate.toISOString());
      },

      prepareDate () {
        this.temporalDate = new Date(this.value);
        let hours = this.temporalDate.getHours();
        if (hours > 12) {
          hours %= 12;
          this.isPM = true;
        } else if (hours > 0) {
          this.isPM = false;
        }
        this.hours = hours === 0 ? 12 : hours;
        this.minutes = this.temporalDate.getMinutes();
        this.seconds = this.temporalDate.getSeconds();
      }
    },
    mounted () {
      this.prepareDate();
    }
  };

</script>

<style lang="scss" scoped>
.timerange {
  display: flex;
  width: 50%;
}
.md-theme-agentiq {

  .md-button-toggle {
    align-items: center;

    .button-toggle {
      min-width: inherit;
      min-height: 32px;
      padding: 0 15px;
      margin-left: 5px;
      color: #fff;
      font-size: 14px;
      line-height: 32px;
      font-weight: 300;
      border-radius: 4px;
      text-transform: none;
      background-color: #08c9da;
    }
  }
  .button-toggle:hover:not([disabled]):not(.md-raised) {
    background-color: rgba(8, 201, 218, 0.8);
  }
}
</style>
