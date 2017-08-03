var inputRange = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-range-container"},[_c('md-button',{staticClass:"button-range",nativeOn:{"click":function($event){_vm.rangeChange(1);}}},[_c('md-icon',[_vm._v("keyboard_arrow_up")])],1),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.preparedValue),expression:"preparedValue"}],staticClass:"input-range",attrs:{"type":"text","maxlength":"2","minlength":"1","readonly":_vm.readonly},domProps:{"value":(_vm.preparedValue)},on:{"keydown":[function($event){if(!('button' in $event)&&$event.keyCode!==38){ return null; }_vm.rangeChange(1);},function($event){if(!('button' in $event)&&$event.keyCode!==40){ return null; }_vm.rangeChange(-1);}],"mousewheel":_vm.scrollRange,"input":function($event){if($event.target.composing){ return; }_vm.preparedValue=$event.target.value;}}}),_c('md-button',{staticClass:"button-range",nativeOn:{"click":function($event){_vm.rangeChange(-1);}}},[_c('md-icon',[_vm._v("keyboard_arrow_down")])],1)],1)},staticRenderFns: [],_scopeId: 'data-v-3b9a5843',
  name: "inputRange",
  props: {
    value: {
      type: Number
      // required: true
    },
    showButtons: {
      type: Boolean,
      default: function () { return false; }
    },
    readonly: {
      type: Boolean,
      default: function () { return false; }
    },
    step: {
      type: Number,
      default: function () { return 1; }
    }
  },
  computed: {
    preparedValue: function preparedValue () {
      return ("" + (this.value.toString().length === 1 ? "0" : "") + (this.value));
    }
  },
  methods: {
    rangeChange: function rangeChange (way) {
      if ( way === void 0 ) way = 1;

      this.change(this.value + way);
    },
    scrollRange: function scrollRange (e) {
      setTimeout(
        this.rangeChange(
          (function (value) { return Math.max(-1, Math.min(1, (value.wheelDelta || -value.detail))); })(window.event || e)
        ),
      1000);
    },
    change: function change (value) {
      this.$emit("change", value);
    }
  }
};

var TimePicker = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"timerange"},[_c('input-range',{attrs:{"readonly":_vm.readonly},on:{"change":_vm.changeHours},model:{value:(_vm.hours),callback:function ($$v) {_vm.hours=$$v;},expression:"hours"}}),_c('input-range',{attrs:{"readonly":_vm.readonly},on:{"change":_vm.changeMinutes},model:{value:(_vm.minutes),callback:function ($$v) {_vm.minutes=$$v;},expression:"minutes"}}),(_vm.showSeconds)?_c('input-range',{attrs:{"readonly":_vm.readonly},on:{"change":_vm.changeSeconds},model:{value:(_vm.seconds),callback:function ($$v) {_vm.seconds=$$v;},expression:"seconds"}}):_vm._e(),_c('md-button-toggle',[_c('md-button',{staticClass:"button-toggle",class:{'md-toggle': _vm.isPM},nativeOn:{"click":function($event){_vm.changeType();}}},[_vm._v(_vm._s(_vm.isPM ? "PM" : "AM"))])],1)],1)},staticRenderFns: [],_scopeId: 'data-v-0861fe6b',
  name: "timePicker",
  components: {
    inputRange: inputRange
  },
  props: {
    value: {
      type: String,
      required: true
    },
    showSeconds: {
      type: Boolean,
      default: function () { return false; }
    },
    showSeparator: {
      type: Boolean,
      default: function () { return false; }
    },
    readonly: {
      type: Boolean,
      default: function () { return false; }
    },
    step: {
      type: Number,
      default: function () { return 1; }
    },
    secondStep: {
      type: Number,
      default: function () { return 1; }
    }
  },
  watch: {
    value: function (value) {
      this.prepareDate();
    }
  },
  data: function data () {
    return {
      temporalDate: null,
      isPM: false,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  },
  methods: {
    changeHours: function changeHours (value) {
      if (value <= 0 || value > 12) {
        this.isPM = !this.isPM;
        value = value <= 0 ? 12 : 1;
      }
      this.hours = value;
      this.temporalDate.setHours(this.isPM ? this.hours + 12 : this.hours);
      this.emitChanges();
    },

    changeMinutes: function changeMinutes (value) {
      if (value <= 0 || value >= 60) {
        this.changeHours(value <= 0 ? --this.hours : ++this.hours);
        value = value <= 0 ? (60 - this.step) : 1;
      }
      this.minutes = value;
      this.temporalDate.setMinutes(this.minutes);
      this.emitChanges();
    },

    changeSeconds: function changeSeconds (value) {
      if (value <= 0 || value >= 60) {
        this.changeMinutes(value <= 0 ? --this.minutes : ++this.minutes);
        value = value <= 0 ? (60 - this.secondStep) : 1;
      }
      this.seconds = value;
      this.temporalDate.setSeconds(this.seconds);
      this.emitChanges();
    },

    changeType: function changeType () {
      this.isPM = !this.isPM;
      this.isPM && (this.temporalDate.setHours(this.hours + 12));
      this.emitChanges();
    },

    emitChanges: function emitChanges () {
      this.$emit("input", this.temporalDate.toISOString());
    },

    prepareDate: function prepareDate () {
      this.temporalDate = new Date(this.value);
      var hours = this.temporalDate.getHours();
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
  mounted: function mounted () {
    this.prepareDate();
  }
};

var VueTimePicker = {
    InputRange: inputRange,
    TimePicker: TimePicker
};

export { VueTimePicker };
