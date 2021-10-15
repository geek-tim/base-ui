/*!
 * @geek-tim/base-ui v0.0.3
 * (c) 2021 kkb
 * @license MIT
 */
import {
  toRefs,
  ref,
  computed,
  openBlock,
  createBlock,
  Transition,
  withCtx,
  withDirectives,
  createElementVNode,
  normalizeClass,
  createElementBlock,
  createCommentVNode,
  renderSlot,
  createTextVNode,
  toDisplayString,
  vShow,
  provide,
  getCurrentInstance,
  h,
  unref,
  defineComponent,
  inject,
  reactive,
  createVNode,
  onUnmounted,
  isVNode,
  onMounted,
  nextTick,
  resolveComponent,
  withModifiers,
  normalizeStyle
} from 'vue'

const TYPE_CLASSES_MAP = {
  success: 'el-icon-success',
  warning: 'el-icon-warning',
  error: 'el-icon-error'
}
var script$4 = {
  name: 'ElAlert',
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'info'
    },
    closable: {
      type: Boolean,
      default: true
    },
    closeText: {
      type: String,
      default: ''
    },
    showIcon: Boolean,
    center: Boolean,
    effect: {
      type: String,
      default: 'light',
      validator: function(value) {
        return ['light', 'dark'].indexOf(value) !== -1
      }
    }
  },
  emits: ['close'],

  setup(props, { emit, slots }) {
    const { description, type } = toRefs(props)
    const visible = ref(true)

    const close = () => {
      visible.value = false
      emit('close')
    }

    const typeClass = computed(() => {
      return `el-alert--${type.value}`
    })
    const iconClass = computed(() => {
      return TYPE_CLASSES_MAP[type.value] || 'el-icon-info'
    })
    const isBigIcon = computed(() => {
      return description.value || slots.default ? 'is-big' : ''
    })
    const isBoldTitle = computed(() => {
      return description.value || slots.default ? 'is-bold' : ''
    })
    return {
      visible,
      typeClass,
      iconClass,
      isBigIcon,
      isBoldTitle,
      close
    }
  }
}

const _hoisted_1$1 = {
  class: 'el-alert__content'
}
const _hoisted_2$1 = {
  key: 1,
  class: 'el-alert__description'
}
const _hoisted_3$1 = {
  key: 2,
  class: 'el-alert__description'
}
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    openBlock(),
    createBlock(
      Transition,
      {
        name: 'el-alert-fade'
      },
      {
        default: withCtx(() => [
          withDirectives(
            createElementVNode(
              'div',
              {
                class: normalizeClass([
                  'el-alert',
                  [
                    $setup.typeClass,
                    $props.center ? 'is-center' : '',
                    'is-' + $props.effect
                  ]
                ]),
                role: 'alert'
              },
              [
                $props.showIcon
                  ? (openBlock(),
                    createElementBlock(
                      'i',
                      {
                        key: 0,
                        class: normalizeClass([
                          'el-alert__icon',
                          [$setup.iconClass, $setup.isBigIcon]
                        ])
                      },
                      null,
                      2
                      /* CLASS */
                    ))
                  : createCommentVNode('v-if', true),
                createElementVNode('div', _hoisted_1$1, [
                  $props.title || _ctx.$slots.title
                    ? (openBlock(),
                      createElementBlock(
                        'span',
                        {
                          key: 0,
                          class: normalizeClass([
                            'el-alert__title',
                            [$setup.isBoldTitle]
                          ])
                        },
                        [
                          renderSlot(_ctx.$slots, 'title', {}, () => [
                            createTextVNode(
                              toDisplayString($props.title),
                              1
                              /* TEXT */
                            )
                          ])
                        ],
                        2
                        /* CLASS */
                      ))
                    : createCommentVNode('v-if', true),
                  _ctx.$slots.default && !$props.description
                    ? (openBlock(),
                      createElementBlock('p', _hoisted_2$1, [
                        renderSlot(_ctx.$slots, 'default')
                      ]))
                    : createCommentVNode('v-if', true),
                  $props.description && !_ctx.$slots.default
                    ? (openBlock(),
                      createElementBlock(
                        'p',
                        _hoisted_3$1,
                        toDisplayString($props.description),
                        1
                        /* TEXT */
                      ))
                    : createCommentVNode('v-if', true),
                  withDirectives(
                    createElementVNode(
                      'i',
                      {
                        class: normalizeClass([
                          'el-alert__closebtn',
                          {
                            'is-customed': $props.closeText !== '',
                            'el-icon-close': $props.closeText === ''
                          }
                        ]),
                        onClick:
                          _cache[0] ||
                          (_cache[0] = (...args) =>
                            $setup.close && $setup.close(...args))
                      },
                      toDisplayString($props.closeText),
                      3
                      /* TEXT, CLASS */
                    ),
                    [[vShow, $props.closable]]
                  )
                ])
              ],
              2
              /* CLASS */
            ),
            [[vShow, $setup.visible]]
          )
        ]),
        _: 3
        /* FORWARDED */
      }
    )
  )
}

script$4.render = render$3
script$4.__file = 'packages/alert/Alert.vue'

/* istanbul ignore next */

script$4.install = function(app) {
  app.component(script$4.name, script$4)
}

var ElRow = {
  name: 'ElRow',
  componentName: 'ElRow',

  setup(props) {
    const style = computed(() => {
      const ret = {}

      if (props.gutter) {
        ret.marginLeft = `-${props.gutter / 2}px`
        ret.marginRight = ret.marginLeft
      }

      return ret
    })
    provide('el-row', getCurrentInstance())
    return {
      style
    }
  },

  props: {
    tag: {
      type: String,
      default: 'div'
    },
    gutter: {
      type: Number,
      default: 0
    },
    type: String,
    justify: {
      type: String,
      default: 'start'
    },
    align: {
      type: String,
      default: 'top'
    }
  },

  render() {
    return h(
      this.tag,
      {
        class: [
          'el-row',
          this.justify !== 'start' ? `is-justify-${this.justify}` : '',
          this.align !== 'top' ? `is-align-${this.align}` : '',
          {
            'el-row--flex': this.type === 'flex'
          }
        ],
        style: this.style
      },
      this.$slots.default && this.$slots.default()
    )
  }
}

/* istanbul ignore next */

ElRow.install = function(app) {
  app.component(ElRow.name, ElRow)
}

var script$3 = {
  name: 'ElCol',
  props: {
    span: {
      type: Number,
      default: 24
    },
    tag: {
      type: String,
      default: 'div'
    },
    offset: Number,
    pull: Number,
    push: Number,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },

  setup(props, { slots }) {
    const { tag } = toRefs(props)
    const gutter = computed(() => {
      let { parent } = getCurrentInstance()

      while (parent && parent.type.componentName !== 'ElRow') {
        parent = parent.parent
      }

      return parent ? parent.props.gutter : 0
    })
    return () => {
      const classList = []
      const style = {}

      if (unref(gutter)) {
        style.paddingLeft = unref(gutter) / 2 + 'px'
        style.paddingRight = style.paddingLeft
      }
      ;['span', 'offset', 'pull', 'push'].forEach(prop => {
        if (unref(toRefs(props)[prop]) || unref(toRefs(props)[prop]) === 0) {
          classList.push(
            prop !== 'span'
              ? `el-col-${prop}-${unref(toRefs(props)[prop])}`
              : `el-col-${unref(toRefs(props)[prop])}`
          )
        }
      })
      ;['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
        if (typeof unref(toRefs(props)[size]) === 'number') {
          classList.push(`el-col-${size}-${unref(toRefs(props)[size])}`)
        } else if (typeof unref(toRefs(props)[size]) === 'object') {
          const propsData = unref(toRefs(props)[size])
          Object.keys(propsData).forEach(prop => {
            classList.push(
              prop !== 'span'
                ? `el-col-${size}-${prop}-${propsData[prop]}`
                : `el-col-${size}-${propsData[prop]}`
            )
          })
        }
      })
      return h(
        unref(tag),
        {
          class: ['el-col', classList],
          style
        },
        slots.default ? slots.default() : ''
      )
    }
  }
}

script$3.__file = 'packages/col/Col.vue'

/* istanbul ignore next */

script$3.install = function(app) {
  app.component(script$3.name, script$3)
}

var props = {
  size: {
    type: String,
    validator: function(val) {
      return ['medium', 'small', 'mini', ''].includes(val)
    }
  },
  type: {
    type: String,
    validator: function(val) {
      return [
        'primary',
        'success',
        'warning',
        'danger',
        'info',
        'text'
      ].includes(val)
    }
  },
  nativeType: {
    type: String,
    default: 'button'
  },
  plain: Boolean,
  round: Boolean,
  circle: Boolean,
  loading: Boolean,
  disabled: Boolean,
  icon: String
}

/**
 * get globalOptions $ELEMENT config object
 */

function useGlobalOptions() {
  const instance = getCurrentInstance()

  if (!instance) {
    console.warn('useGlobalOptions must be call in setup function')
    return
  }

  return instance.appContext.config.globalProperties.$ELEMENT || {}
}

var script$2 = defineComponent({
  name: 'ElButton',
  props: props,
  setup: function(props) {
    var _a = toRefs(props),
      size = _a.size,
      disabled = _a.disabled

    var buttonSize = useButtonSize(size)
    var buttonDisabled = useButtonDisabled(disabled)
    var classes = useClasses({
      props: props,
      size: buttonSize,
      disabled: buttonDisabled
    })
    return {
      buttonDisabled: buttonDisabled,
      classes: classes
    }
  }
})

var useClasses = function(_a) {
  var props = _a.props,
    size = _a.size,
    disabled = _a.disabled
  return computed(function() {
    return [
      size.value ? 'el-button--' + size.value : '',
      props.type ? 'el-button--' + props.type : '',
      {
        'is-plain': props.plain,
        'is-round': props.round,
        'is-circle': props.circle,
        'is-loading': props.loading,
        'is-disabled': disabled.value
      }
    ]
  })
}

var useButtonDisabled = function(disabled) {
  return computed(function() {
    var elForm = inject('elForm', null)
    return (
      (disabled === null || disabled === void 0 ? void 0 : disabled.value) ||
      (elForm === null || elForm === void 0 ? void 0 : elForm.disabled)
    )
  })
}

var useButtonSize = function(size) {
  var globalConfig = useGlobalOptions()
  return computed(function() {
    var elFormItem = inject('elFormItem', null)
    return (
      (size === null || size === void 0 ? void 0 : size.value) ||
      (elFormItem === null || elFormItem === void 0
        ? void 0
        : elFormItem.elFormItemSize) ||
      globalConfig.size
    )
  })
}

const _hoisted_1 = ['type', 'disabled']
const _hoisted_2 = {
  key: 0,
  class: 'el-icon-loading',
  'data-testid': 'loadingIcon'
}
const _hoisted_3 = {
  key: 2
}
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    openBlock(),
    createElementBlock(
      'button',
      {
        class: normalizeClass(['el-button', _ctx.classes]),
        type: _ctx.nativeType,
        disabled: _ctx.buttonDisabled || _ctx.loading
      },
      [
        _ctx.loading
          ? (openBlock(), createElementBlock('i', _hoisted_2))
          : _ctx.icon
          ? (openBlock(),
            createElementBlock(
              'i',
              {
                key: 1,
                class: normalizeClass(_ctx.icon),
                'data-testid': 'icon'
              },
              null,
              2
              /* CLASS */
            ))
          : createCommentVNode('v-if', true),
        _ctx.$slots.default
          ? (openBlock(),
            createElementBlock('span', _hoisted_3, [
              renderSlot(_ctx.$slots, 'default')
            ]))
          : createCommentVNode('v-if', true)
      ],
      10,
      /* CLASS, PROPS */
      _hoisted_1
    )
  )
}

script$2.render = render$2
script$2.__file = 'src/components/Button/src/Button.vue'

script$2.install = function(app) {
  app.component(script$2.name, script$2)
}

/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */

/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function() {
  if (typeof Map !== 'undefined') {
    return Map
  }
  /**
   * Returns index in provided array that matches the specified key.
   *
   * @param {Array<Array>} arr
   * @param {*} key
   * @returns {number}
   */

  function getIndex(arr, key) {
    var result = -1
    arr.some(function(entry, index) {
      if (entry[0] === key) {
        result = index
        return true
      }

      return false
    })
    return result
  }

  return (function() {
    function class_1() {
      this.__entries__ = []
    }

    Object.defineProperty(class_1.prototype, 'size', {
      /**
       * @returns {boolean}
       */
      get: function() {
        return this.__entries__.length
      },
      enumerable: true,
      configurable: true
    })
    /**
     * @param {*} key
     * @returns {*}
     */

    class_1.prototype.get = function(key) {
      var index = getIndex(this.__entries__, key)
      var entry = this.__entries__[index]
      return entry && entry[1]
    }
    /**
     * @param {*} key
     * @param {*} value
     * @returns {void}
     */

    class_1.prototype.set = function(key, value) {
      var index = getIndex(this.__entries__, key)

      if (~index) {
        this.__entries__[index][1] = value
      } else {
        this.__entries__.push([key, value])
      }
    }
    /**
     * @param {*} key
     * @returns {void}
     */

    class_1.prototype.delete = function(key) {
      var entries = this.__entries__
      var index = getIndex(entries, key)

      if (~index) {
        entries.splice(index, 1)
      }
    }
    /**
     * @param {*} key
     * @returns {void}
     */

    class_1.prototype.has = function(key) {
      return !!~getIndex(this.__entries__, key)
    }
    /**
     * @returns {void}
     */

    class_1.prototype.clear = function() {
      this.__entries__.splice(0)
    }
    /**
     * @param {Function} callback
     * @param {*} [ctx=null]
     * @returns {void}
     */

    class_1.prototype.forEach = function(callback, ctx) {
      if (ctx === void 0) {
        ctx = null
      }

      for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
        var entry = _a[_i]
        callback.call(ctx, entry[1], entry[0])
      }
    }

    return class_1
  })()
})()
/**
 * Detects whether window and document objects are available in current environment.
 */

var isBrowser =
  typeof window !== 'undefined' &&
  typeof document !== 'undefined' &&
  window.document === document // Returns global object of a current environment.

var global$1 = (function() {
  if (typeof global !== 'undefined' && global.Math === Math) {
    return global
  }

  if (typeof self !== 'undefined' && self.Math === Math) {
    return self
  }

  if (typeof window !== 'undefined' && window.Math === Math) {
    return window
  } // eslint-disable-next-line no-new-func

  return Function('return this')()
})()
/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */

var requestAnimationFrame$1 = (function() {
  if (typeof requestAnimationFrame === 'function') {
    // It's required to use a bounded function because IE sometimes throws
    // an "Invalid calling object" error if rAF is invoked without the global
    // object on the left hand side.
    return requestAnimationFrame.bind(global$1)
  }

  return function(callback) {
    return setTimeout(function() {
      return callback(Date.now())
    }, 1000 / 60)
  }
})() // Defines minimum timeout before adding a trailing call.

var trailingTimeout = 2
/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */

function throttle$1(callback, delay) {
  var leadingCall = false,
    trailingCall = false,
    lastCallTime = 0
  /**
   * Invokes the original callback function and schedules new invocation if
   * the "proxy" was called during current request.
   *
   * @returns {void}
   */

  function resolvePending() {
    if (leadingCall) {
      leadingCall = false
      callback()
    }

    if (trailingCall) {
      proxy()
    }
  }
  /**
   * Callback invoked after the specified delay. It will further postpone
   * invocation of the original function delegating it to the
   * requestAnimationFrame.
   *
   * @returns {void}
   */

  function timeoutCallback() {
    requestAnimationFrame$1(resolvePending)
  }
  /**
   * Schedules invocation of the original function.
   *
   * @returns {void}
   */

  function proxy() {
    var timeStamp = Date.now()

    if (leadingCall) {
      // Reject immediately following calls.
      if (timeStamp - lastCallTime < trailingTimeout) {
        return
      } // Schedule new call to be in invoked when the pending one is resolved.
      // This is important for "transitions" which never actually start
      // immediately so there is a chance that we might miss one if change
      // happens amids the pending invocation.

      trailingCall = true
    } else {
      leadingCall = true
      trailingCall = false
      setTimeout(timeoutCallback, delay)
    }

    lastCallTime = timeStamp
  }

  return proxy
} // Minimum delay before invoking the update of observers.

var REFRESH_DELAY = 20 // A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.

var transitionKeys = [
  'top',
  'right',
  'bottom',
  'left',
  'width',
  'height',
  'size',
  'weight'
] // Check if MutationObserver is available.

var mutationObserverSupported = typeof MutationObserver !== 'undefined'
/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */

var ResizeObserverController = (function() {
  /**
   * Creates a new instance of ResizeObserverController.
   *
   * @private
   */
  function ResizeObserverController() {
    /**
     * Indicates whether DOM listeners have been added.
     *
     * @private {boolean}
     */
    this.connected_ = false
    /**
     * Tells that controller has subscribed for Mutation Events.
     *
     * @private {boolean}
     */

    this.mutationEventsAdded_ = false
    /**
     * Keeps reference to the instance of MutationObserver.
     *
     * @private {MutationObserver}
     */

    this.mutationsObserver_ = null
    /**
     * A list of connected observers.
     *
     * @private {Array<ResizeObserverSPI>}
     */

    this.observers_ = []
    this.onTransitionEnd_ = this.onTransitionEnd_.bind(this)
    this.refresh = throttle$1(this.refresh.bind(this), REFRESH_DELAY)
  }
  /**
   * Adds observer to observers list.
   *
   * @param {ResizeObserverSPI} observer - Observer to be added.
   * @returns {void}
   */

  ResizeObserverController.prototype.addObserver = function(observer) {
    if (!~this.observers_.indexOf(observer)) {
      this.observers_.push(observer)
    } // Add listeners if they haven't been added yet.

    if (!this.connected_) {
      this.connect_()
    }
  }
  /**
   * Removes observer from observers list.
   *
   * @param {ResizeObserverSPI} observer - Observer to be removed.
   * @returns {void}
   */

  ResizeObserverController.prototype.removeObserver = function(observer) {
    var observers = this.observers_
    var index = observers.indexOf(observer) // Remove observer if it's present in registry.

    if (~index) {
      observers.splice(index, 1)
    } // Remove listeners if controller has no connected observers.

    if (!observers.length && this.connected_) {
      this.disconnect_()
    }
  }
  /**
   * Invokes the update of observers. It will continue running updates insofar
   * it detects changes.
   *
   * @returns {void}
   */

  ResizeObserverController.prototype.refresh = function() {
    var changesDetected = this.updateObservers_() // Continue running updates if changes have been detected as there might
    // be future ones caused by CSS transitions.

    if (changesDetected) {
      this.refresh()
    }
  }
  /**
   * Updates every observer from observers list and notifies them of queued
   * entries.
   *
   * @private
   * @returns {boolean} Returns "true" if any observer has detected changes in
   *      dimensions of it's elements.
   */

  ResizeObserverController.prototype.updateObservers_ = function() {
    // Collect observers that have active observations.
    var activeObservers = this.observers_.filter(function(observer) {
      return observer.gatherActive(), observer.hasActive()
    }) // Deliver notifications in a separate cycle in order to avoid any
    // collisions between observers, e.g. when multiple instances of
    // ResizeObserver are tracking the same element and the callback of one
    // of them changes content dimensions of the observed target. Sometimes
    // this may result in notifications being blocked for the rest of observers.

    activeObservers.forEach(function(observer) {
      return observer.broadcastActive()
    })
    return activeObservers.length > 0
  }
  /**
   * Initializes DOM listeners.
   *
   * @private
   * @returns {void}
   */

  ResizeObserverController.prototype.connect_ = function() {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already added.
    if (!isBrowser || this.connected_) {
      return
    } // Subscription to the "Transitionend" event is used as a workaround for
    // delayed transitions. This way it's possible to capture at least the
    // final state of an element.

    document.addEventListener('transitionend', this.onTransitionEnd_)
    window.addEventListener('resize', this.refresh)

    if (mutationObserverSupported) {
      this.mutationsObserver_ = new MutationObserver(this.refresh)
      this.mutationsObserver_.observe(document, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      })
    } else {
      document.addEventListener('DOMSubtreeModified', this.refresh)
      this.mutationEventsAdded_ = true
    }

    this.connected_ = true
  }
  /**
   * Removes DOM listeners.
   *
   * @private
   * @returns {void}
   */

  ResizeObserverController.prototype.disconnect_ = function() {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already removed.
    if (!isBrowser || !this.connected_) {
      return
    }

    document.removeEventListener('transitionend', this.onTransitionEnd_)
    window.removeEventListener('resize', this.refresh)

    if (this.mutationsObserver_) {
      this.mutationsObserver_.disconnect()
    }

    if (this.mutationEventsAdded_) {
      document.removeEventListener('DOMSubtreeModified', this.refresh)
    }

    this.mutationsObserver_ = null
    this.mutationEventsAdded_ = false
    this.connected_ = false
  }
  /**
   * "Transitionend" event handler.
   *
   * @private
   * @param {TransitionEvent} event
   * @returns {void}
   */

  ResizeObserverController.prototype.onTransitionEnd_ = function(_a) {
    var _b = _a.propertyName,
      propertyName = _b === void 0 ? '' : _b // Detect whether transition may affect dimensions of an element.

    var isReflowProperty = transitionKeys.some(function(key) {
      return !!~propertyName.indexOf(key)
    })

    if (isReflowProperty) {
      this.refresh()
    }
  }
  /**
   * Returns instance of the ResizeObserverController.
   *
   * @returns {ResizeObserverController}
   */

  ResizeObserverController.getInstance = function() {
    if (!this.instance_) {
      this.instance_ = new ResizeObserverController()
    }

    return this.instance_
  }
  /**
   * Holds reference to the controller's instance.
   *
   * @private {ResizeObserverController}
   */

  ResizeObserverController.instance_ = null
  return ResizeObserverController
})()
/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */

var defineConfigurable = function(target, props) {
  for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
    var key = _a[_i]
    Object.defineProperty(target, key, {
      value: props[key],
      enumerable: false,
      writable: false,
      configurable: true
    })
  }

  return target
}
/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */

var getWindowOf = function(target) {
  // Assume that the element is an instance of Node, which means that it
  // has the "ownerDocument" property from which we can retrieve a
  // corresponding global object.
  var ownerGlobal =
    target && target.ownerDocument && target.ownerDocument.defaultView // Return the local global object if it's not possible extract one from
  // provided element.

  return ownerGlobal || global$1
} // Placeholder of an empty content rectangle.

var emptyRect = createRectInit(0, 0, 0, 0)
/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */

function toFloat(value) {
  return parseFloat(value) || 0
}
/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */

function getBordersSize(styles) {
  var positions = []

  for (var _i = 1; _i < arguments.length; _i++) {
    positions[_i - 1] = arguments[_i]
  }

  return positions.reduce(function(size, position) {
    var value = styles['border-' + position + '-width']
    return size + toFloat(value)
  }, 0)
}
/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */

function getPaddings(styles) {
  var positions = ['top', 'right', 'bottom', 'left']
  var paddings = {}

  for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
    var position = positions_1[_i]
    var value = styles['padding-' + position]
    paddings[position] = toFloat(value)
  }

  return paddings
}
/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */

function getSVGContentRect(target) {
  var bbox = target.getBBox()
  return createRectInit(0, 0, bbox.width, bbox.height)
}
/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */

function getHTMLElementContentRect(target) {
  // Client width & height properties can't be
  // used exclusively as they provide rounded values.
  var clientWidth = target.clientWidth,
    clientHeight = target.clientHeight // By this condition we can catch all non-replaced inline, hidden and
  // detached elements. Though elements with width & height properties less
  // than 0.5 will be discarded as well.
  //
  // Without it we would need to implement separate methods for each of
  // those cases and it's not possible to perform a precise and performance
  // effective test for hidden elements. E.g. even jQuery's ':visible' filter
  // gives wrong results for elements with width & height less than 0.5.

  if (!clientWidth && !clientHeight) {
    return emptyRect
  }

  var styles = getWindowOf(target).getComputedStyle(target)
  var paddings = getPaddings(styles)
  var horizPad = paddings.left + paddings.right
  var vertPad = paddings.top + paddings.bottom // Computed styles of width & height are being used because they are the
  // only dimensions available to JS that contain non-rounded values. It could
  // be possible to utilize the getBoundingClientRect if only it's data wasn't
  // affected by CSS transformations let alone paddings, borders and scroll bars.

  var width = toFloat(styles.width),
    height = toFloat(styles.height) // Width & height include paddings and borders when the 'border-box' box
  // model is applied (except for IE).

  if (styles.boxSizing === 'border-box') {
    // Following conditions are required to handle Internet Explorer which
    // doesn't include paddings and borders to computed CSS dimensions.
    //
    // We can say that if CSS dimensions + paddings are equal to the "client"
    // properties then it's either IE, and thus we don't need to subtract
    // anything, or an element merely doesn't have paddings/borders styles.
    if (Math.round(width + horizPad) !== clientWidth) {
      width -= getBordersSize(styles, 'left', 'right') + horizPad
    }

    if (Math.round(height + vertPad) !== clientHeight) {
      height -= getBordersSize(styles, 'top', 'bottom') + vertPad
    }
  } // Following steps can't be applied to the document's root element as its
  // client[Width/Height] properties represent viewport area of the window.
  // Besides, it's as well not necessary as the <html> itself neither has
  // rendered scroll bars nor it can be clipped.

  if (!isDocumentElement(target)) {
    // In some browsers (only in Firefox, actually) CSS width & height
    // include scroll bars size which can be removed at this step as scroll
    // bars are the only difference between rounded dimensions + paddings
    // and "client" properties, though that is not always true in Chrome.
    var vertScrollbar = Math.round(width + horizPad) - clientWidth
    var horizScrollbar = Math.round(height + vertPad) - clientHeight // Chrome has a rather weird rounding of "client" properties.
    // E.g. for an element with content width of 314.2px it sometimes gives
    // the client width of 315px and for the width of 314.7px it may give
    // 314px. And it doesn't happen all the time. So just ignore this delta
    // as a non-relevant.

    if (Math.abs(vertScrollbar) !== 1) {
      width -= vertScrollbar
    }

    if (Math.abs(horizScrollbar) !== 1) {
      height -= horizScrollbar
    }
  }

  return createRectInit(paddings.left, paddings.top, width, height)
}
/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */

var isSVGGraphicsElement = (function() {
  // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
  // interface.
  if (typeof SVGGraphicsElement !== 'undefined') {
    return function(target) {
      return target instanceof getWindowOf(target).SVGGraphicsElement
    }
  } // If it's so, then check that element is at least an instance of the
  // SVGElement and that it has the "getBBox" method.
  // eslint-disable-next-line no-extra-parens

  return function(target) {
    return (
      target instanceof getWindowOf(target).SVGElement &&
      typeof target.getBBox === 'function'
    )
  }
})()
/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */

function isDocumentElement(target) {
  return target === getWindowOf(target).document.documentElement
}
/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */

function getContentRect(target) {
  if (!isBrowser) {
    return emptyRect
  }

  if (isSVGGraphicsElement(target)) {
    return getSVGContentRect(target)
  }

  return getHTMLElementContentRect(target)
}
/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */

function createReadOnlyRect(_a) {
  var x = _a.x,
    y = _a.y,
    width = _a.width,
    height = _a.height // If DOMRectReadOnly is available use it as a prototype for the rectangle.

  var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object
  var rect = Object.create(Constr.prototype) // Rectangle's properties are not writable and non-enumerable.

  defineConfigurable(rect, {
    x: x,
    y: y,
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: height + y,
    left: x
  })
  return rect
}
/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */

function createRectInit(x, y, width, height) {
  return {
    x: x,
    y: y,
    width: width,
    height: height
  }
}
/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */

var ResizeObservation = (function() {
  /**
   * Creates an instance of ResizeObservation.
   *
   * @param {Element} target - Element to be observed.
   */
  function ResizeObservation(target) {
    /**
     * Broadcasted width of content rectangle.
     *
     * @type {number}
     */
    this.broadcastWidth = 0
    /**
     * Broadcasted height of content rectangle.
     *
     * @type {number}
     */

    this.broadcastHeight = 0
    /**
     * Reference to the last observed content rectangle.
     *
     * @private {DOMRectInit}
     */

    this.contentRect_ = createRectInit(0, 0, 0, 0)
    this.target = target
  }
  /**
   * Updates content rectangle and tells whether it's width or height properties
   * have changed since the last broadcast.
   *
   * @returns {boolean}
   */

  ResizeObservation.prototype.isActive = function() {
    var rect = getContentRect(this.target)
    this.contentRect_ = rect
    return (
      rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight
    )
  }
  /**
   * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
   * from the corresponding properties of the last observed content rectangle.
   *
   * @returns {DOMRectInit} Last observed content rectangle.
   */

  ResizeObservation.prototype.broadcastRect = function() {
    var rect = this.contentRect_
    this.broadcastWidth = rect.width
    this.broadcastHeight = rect.height
    return rect
  }

  return ResizeObservation
})()

var ResizeObserverEntry = (function() {
  /**
   * Creates an instance of ResizeObserverEntry.
   *
   * @param {Element} target - Element that is being observed.
   * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
   */
  function ResizeObserverEntry(target, rectInit) {
    var contentRect = createReadOnlyRect(rectInit) // According to the specification following properties are not writable
    // and are also not enumerable in the native implementation.
    //
    // Property accessors are not being used as they'd require to define a
    // private WeakMap storage which may cause memory leaks in browsers that
    // don't support this type of collections.

    defineConfigurable(this, {
      target: target,
      contentRect: contentRect
    })
  }

  return ResizeObserverEntry
})()

var ResizeObserverSPI = (function() {
  /**
   * Creates a new instance of ResizeObserver.
   *
   * @param {ResizeObserverCallback} callback - Callback function that is invoked
   *      when one of the observed elements changes it's content dimensions.
   * @param {ResizeObserverController} controller - Controller instance which
   *      is responsible for the updates of observer.
   * @param {ResizeObserver} callbackCtx - Reference to the public
   *      ResizeObserver instance which will be passed to callback function.
   */
  function ResizeObserverSPI(callback, controller, callbackCtx) {
    /**
     * Collection of resize observations that have detected changes in dimensions
     * of elements.
     *
     * @private {Array<ResizeObservation>}
     */
    this.activeObservations_ = []
    /**
     * Registry of the ResizeObservation instances.
     *
     * @private {Map<Element, ResizeObservation>}
     */

    this.observations_ = new MapShim()

    if (typeof callback !== 'function') {
      throw new TypeError(
        'The callback provided as parameter 1 is not a function.'
      )
    }

    this.callback_ = callback
    this.controller_ = controller
    this.callbackCtx_ = callbackCtx
  }
  /**
   * Starts observing provided element.
   *
   * @param {Element} target - Element to be observed.
   * @returns {void}
   */

  ResizeObserverSPI.prototype.observe = function(target) {
    if (!arguments.length) {
      throw new TypeError('1 argument required, but only 0 present.')
    } // Do nothing if current environment doesn't have the Element interface.

    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
      return
    }

    if (!(target instanceof getWindowOf(target).Element)) {
      throw new TypeError('parameter 1 is not of type "Element".')
    }

    var observations = this.observations_ // Do nothing if element is already being observed.

    if (observations.has(target)) {
      return
    }

    observations.set(target, new ResizeObservation(target))
    this.controller_.addObserver(this) // Force the update of observations.

    this.controller_.refresh()
  }
  /**
   * Stops observing provided element.
   *
   * @param {Element} target - Element to stop observing.
   * @returns {void}
   */

  ResizeObserverSPI.prototype.unobserve = function(target) {
    if (!arguments.length) {
      throw new TypeError('1 argument required, but only 0 present.')
    } // Do nothing if current environment doesn't have the Element interface.

    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
      return
    }

    if (!(target instanceof getWindowOf(target).Element)) {
      throw new TypeError('parameter 1 is not of type "Element".')
    }

    var observations = this.observations_ // Do nothing if element is not being observed.

    if (!observations.has(target)) {
      return
    }

    observations.delete(target)

    if (!observations.size) {
      this.controller_.removeObserver(this)
    }
  }
  /**
   * Stops observing all elements.
   *
   * @returns {void}
   */

  ResizeObserverSPI.prototype.disconnect = function() {
    this.clearActive()
    this.observations_.clear()
    this.controller_.removeObserver(this)
  }
  /**
   * Collects observation instances the associated element of which has changed
   * it's content rectangle.
   *
   * @returns {void}
   */

  ResizeObserverSPI.prototype.gatherActive = function() {
    var _this = this

    this.clearActive()
    this.observations_.forEach(function(observation) {
      if (observation.isActive()) {
        _this.activeObservations_.push(observation)
      }
    })
  }
  /**
   * Invokes initial callback function with a list of ResizeObserverEntry
   * instances collected from active resize observations.
   *
   * @returns {void}
   */

  ResizeObserverSPI.prototype.broadcastActive = function() {
    // Do nothing if observer doesn't have active observations.
    if (!this.hasActive()) {
      return
    }

    var ctx = this.callbackCtx_ // Create ResizeObserverEntry instance for every active observation.

    var entries = this.activeObservations_.map(function(observation) {
      return new ResizeObserverEntry(
        observation.target,
        observation.broadcastRect()
      )
    })
    this.callback_.call(ctx, entries, ctx)
    this.clearActive()
  }
  /**
   * Clears the collection of active observations.
   *
   * @returns {void}
   */

  ResizeObserverSPI.prototype.clearActive = function() {
    this.activeObservations_.splice(0)
  }
  /**
   * Tells whether observer has active observations.
   *
   * @returns {boolean}
   */

  ResizeObserverSPI.prototype.hasActive = function() {
    return this.activeObservations_.length > 0
  }

  return ResizeObserverSPI
})() // Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.

var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim()
/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */

var ResizeObserver = (function() {
  /**
   * Creates a new instance of ResizeObserver.
   *
   * @param {ResizeObserverCallback} callback - Callback that is invoked when
   *      dimensions of the observed elements change.
   */
  function ResizeObserver(callback) {
    if (!(this instanceof ResizeObserver)) {
      throw new TypeError('Cannot call a class as a function.')
    }

    if (!arguments.length) {
      throw new TypeError('1 argument required, but only 0 present.')
    }

    var controller = ResizeObserverController.getInstance()
    var observer = new ResizeObserverSPI(callback, controller, this)
    observers.set(this, observer)
  }

  return ResizeObserver
})() // Expose public methods of ResizeObserver.

;['observe', 'unobserve', 'disconnect'].forEach(function(method) {
  ResizeObserver.prototype[method] = function() {
    var _a

    return (_a = observers.get(this))[method].apply(_a, arguments)
  }
})

var index = (function() {
  // Export existing implementation if available.
  if (typeof global$1.ResizeObserver !== 'undefined') {
    return global$1.ResizeObserver
  }

  return ResizeObserver
})()

const isServer = typeof window === 'undefined'
/* istanbul ignore next */

const resizeHandler = function(entries) {
  for (const entry of entries) {
    const listeners = entry.target.__resizeListeners__ || []

    if (listeners.length) {
      listeners.forEach(fn => {
        fn()
      })
    }
  }
}
/* istanbul ignore next */

const addResizeListener = function(element, fn) {
  if (isServer) return

  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = []
    element.__ro__ = new index(resizeHandler)

    element.__ro__.observe(element)
  }

  element.__resizeListeners__.push(fn)
}
/* istanbul ignore next */

const removeResizeListener = function(element, fn) {
  if (!element || !element.__resizeListeners__) return

  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1)

  if (!element.__resizeListeners__.length) {
    element.__ro__.disconnect()
  }
}

let scrollBarWidth
function scrollbarWidth() {
  // if (Vue.prototype.$isServer) return 0
  if (scrollBarWidth !== undefined) return scrollBarWidth
  const outer = document.createElement('div')
  outer.className = 'el-scrollbar__wrap'
  outer.style.visibility = 'hidden'
  outer.style.width = '100px'
  outer.style.position = 'absolute'
  outer.style.top = '-9999px'
  document.body.appendChild(outer)
  const widthNoScroll = outer.offsetWidth
  outer.style.overflow = 'scroll'
  const inner = document.createElement('div')
  inner.style.width = '100%'
  outer.appendChild(inner)
  const widthWithScroll = inner.offsetWidth
  outer.parentNode.removeChild(outer)
  scrollBarWidth = widthNoScroll - widthWithScroll
  return scrollBarWidth
}

function extend(to, _from) {
  for (const key in _from) {
    to[key] = _from[key]
  }

  return to
}

function toObject(arr) {
  var res = {}

  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }

  return res
}

/* istanbul ignore next */
/* istanbul ignore next */

const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()
/* istanbul ignore next */

const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

const BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left'
  }
}
function renderThumbStyle({ move, size, bar }) {
  const style = {}
  const translate = `translate${bar.value.axis}(${move.value}%)`
  style[bar.value.size] = size.value
  style.transform = translate
  style.msTransform = translate
  style.webkitTransform = translate
  return style
}

const useDrag = ({ bar, state, thumb, cursorDown }) => {
  const instance = getCurrentInstance()
  const { proxy } = instance
  const wrap = computed(() => instance.parent.proxy.wrap)

  const startDrag = e => {
    e.stopImmediatePropagation()
    cursorDown.value = true
    on(document, 'mousemove', mouseMoveDocumentHandler)
    on(document, 'mouseup', mouseUpDocumentHandler)

    document.onselectstart = () => false
  }

  const mouseMoveDocumentHandler = e => {
    if (cursorDown.value === false) return
    const prevPage = state[bar.value.axis]
    if (!prevPage) return
    const offset =
      (proxy.$el.getBoundingClientRect()[bar.value.direction] -
        e[bar.value.client]) *
      -1
    const thumbClickPosition = thumb.value[bar.value.offset] - prevPage
    const thumbPositionPercentage =
      ((offset - thumbClickPosition) * 100) / proxy.$el[bar.value.offset]
    wrap.value[bar.value.scroll] =
      (thumbPositionPercentage * wrap.value[bar.value.scrollSize]) / 100
  }

  const mouseUpDocumentHandler = () => {
    cursorDown.value = false
    state[bar.value.axis] = 0
    off(document, 'mousemove', mouseMoveDocumentHandler)
    document.onselectstart = null
  }

  const clickThumbHandler = e => {
    // prevent click event of right button
    if (e.ctrlKey || e.button === 2) {
      return
    }

    startDrag(e)
    state[bar.value.axis] =
      e.currentTarget[bar.value.offset] -
      (e[bar.value.client] -
        e.currentTarget.getBoundingClientRect()[bar.value.direction])
  }

  const clickTrackHandler = e => {
    const offset = Math.abs(
      e.target.getBoundingClientRect()[bar.value.direction] -
        e[bar.value.client]
    )
    const thumbHalf = thumb.value[bar.value.offset] / 2
    const thumbPositionPercentage =
      ((offset - thumbHalf) * 100) / proxy.$el[bar.value.offset]
    wrap.value[bar.value.scroll] =
      (thumbPositionPercentage * wrap.value[bar.value.scrollSize]) / 100
  }

  onUnmounted(() => {
    off(document, 'mouseup', mouseUpDocumentHandler)
  })
  return {
    clickThumbHandler,
    clickTrackHandler
  }
}
/* istanbul ignore next */

var Bar = {
  name: 'Bar',
  props: {
    vertical: Boolean,
    size: String,
    move: Number
  },

  setup(props) {
    const { size, move, vertical } = toRefs(props)
    const bar = computed(
      () => BAR_MAP[vertical.value ? 'vertical' : 'horizontal']
    )
    const state = reactive({})
    const cursorDown = ref(false)
    const thumb = ref(null)
    const { clickThumbHandler, clickTrackHandler } = useDrag({
      bar,
      state,
      thumb,
      cursorDown
    })
    return () =>
      createVNode(
        'div',
        {
          class: ['el-scrollbar__bar', 'is-' + bar.value.key],
          onMouseDown: clickTrackHandler
        },
        [
          createVNode(
            'div',
            {
              ref: thumb,
              className: 'el-scrollbar__thumb',
              onMouseDown: clickThumbHandler,
              style: renderThumbStyle({
                size,
                move,
                bar
              })
            },
            null
          )
        ]
      )
  }
}

function _isSlot(s) {
  return (
    typeof s === 'function' ||
    (Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s))
  )
}

const useScroll = (wrap, native, resize, noresize) => {
  const data = reactive({
    sizeWidth: '0',
    sizeHeight: '0',
    moveX: 0,
    moveY: 0
  })

  const handleScroll = () => {
    data.moveY = (wrap.value.scrollTop * 100) / wrap.value.clientHeight
    data.moveX = (wrap.value.scrollLeft * 100) / wrap.value.clientWidth
  }

  const update = () => {
    if (!(wrap !== null && wrap !== void 0 && wrap.value)) return
    const heightPercentage =
      (wrap.value.clientHeight * 100) / wrap.value.scrollHeight
    const widthPercentage =
      (wrap.value.clientWidth * 100) / wrap.value.scrollWidth
    data.sizeHeight = heightPercentage < 100 ? heightPercentage + '%' : ''
    data.sizeWidth = widthPercentage < 100 ? widthPercentage + '%' : ''
  }

  onMounted(() => {
    if (native.value) return
    nextTick(update)
    !noresize.value && addResizeListener(resize.value, update)
  })
  onUnmounted(() => {
    if (native.value) return
    !noresize.value && removeResizeListener(resize.value, update)
  })
  return {
    data,
    update,
    handleScroll
  }
}
/* istanbul ignore next */

var ElScrollbar = {
  name: 'ElScrollbar',
  components: {
    Bar
  },
  props: {
    native: Boolean,
    wrapStyle: {},
    wrapClass: {},
    viewClass: {},
    viewStyle: {},
    noresize: Boolean,
    // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: {
      type: String,
      default: 'div'
    }
  },

  setup(props) {
    const wrap = ref(null)
    const resize = ref(null)
    const { wrapStyle, tag, native, noresize } = toRefs(props)
    const gutter = scrollbarWidth()
    let style =
      wrapStyle === null || wrapStyle === void 0 ? void 0 : wrapStyle.value
    const ComponentName = tag.value

    if (gutter) {
      const gutterWith = `-${gutter}px`
      const gutterStyle = `margin-bottom: ${gutterWith}; margin-right: ${gutterWith};`

      if (
        Array.isArray(
          wrapStyle === null || wrapStyle === void 0 ? void 0 : wrapStyle.value
        )
      ) {
        style = toObject(
          wrapStyle === null || wrapStyle === void 0 ? void 0 : wrapStyle.value
        )
        style.marginRight = style.marginBottom = gutterWith
      } else if (typeof wrapStyle === 'string') {
        style += gutterStyle
      } else {
        style = gutterStyle
      }
    }

    const { data, handleScroll, update } = useScroll(
      wrap,
      native,
      resize,
      noresize
    )
    return {
      // state
      data,
      style,
      native,
      gutter,
      wrap,
      resize,
      ComponentName,
      // methods
      handleScroll,
      update
    }
  },

  render() {
    let _slot

    const ComponentName = this.ComponentName
    return createVNode(
      'div',
      {
        class: 'el-scrollbar'
      },
      [
        createVNode(
          'div',
          {
            ref: 'wrap',
            class: [
              this.wrapClass,
              'el-scrollbar__wrap',
              {
                'el-scrollbar__wrap--hidden-default':
                  !this.native && !this.gutter
              }
            ],
            onScroll: () => {
              !this.native && this.handleScroll()
            },
            style: this.style
          },
          [
            createVNode(
              ComponentName,
              {
                ref: 'resize',
                class: ['el-scrollbar__view', this.viewClass],
                style: this.viewStyle
              },
              _isSlot((_slot = this.$slots.default()))
                ? _slot
                : {
                    default: () => [_slot]
                  }
            )
          ]
        ),
        !this.native.value && [
          createVNode(
            Bar,
            {
              move: this.data.moveX,
              size: this.data.sizeWidth
            },
            null
          ),
          createVNode(
            Bar,
            {
              vertical: true,
              move: this.data.moveY,
              size: this.data.sizeHeight
            },
            null
          )
        ]
      ]
    )
  }
}

/* istanbul ignore next */

ElScrollbar.install = function(app) {
  app.component(ElScrollbar.name, ElScrollbar)
}

/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param  {number}    delay -          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {boolean}   [noTrailing] -   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
 *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
 *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
 *                                    the internal counter is reset).
 * @param  {Function}  callback -       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                    to `callback` when the throttled-function is executed.
 * @param  {boolean}   [debounceMode] - If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
 *                                    schedule `callback` to execute after `delay` ms.
 *
 * @returns {Function}  A new, throttled, function.
 */
function throttle(delay, noTrailing, callback, debounceMode) {
  /*
   * After wrapper has stopped being called, this timeout ensures that
   * `callback` is executed at the proper times in `throttle` and `end`
   * debounce modes.
   */
  var timeoutID
  var cancelled = false // Keep track of the last time `callback` was executed.

  var lastExec = 0 // Function to clear existing timeout

  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
  } // Function to cancel next exec

  function cancel() {
    clearExistingTimeout()
    cancelled = true
  } // `noTrailing` defaults to falsy.

  if (typeof noTrailing !== 'boolean') {
    debounceMode = callback
    callback = noTrailing
    noTrailing = undefined
  }
  /*
   * The `wrapper` function encapsulates all of the throttling / debouncing
   * functionality and when executed will limit the rate at which `callback`
   * is executed.
   */

  function wrapper() {
    for (
      var _len = arguments.length, arguments_ = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      arguments_[_key] = arguments[_key]
    }

    var self = this
    var elapsed = Date.now() - lastExec

    if (cancelled) {
      return
    } // Execute `callback` and update the `lastExec` timestamp.

    function exec() {
      lastExec = Date.now()
      callback.apply(self, arguments_)
    }
    /*
     * If `debounceMode` is true (at begin) this is used to clear the flag
     * to allow future `callback` executions.
     */

    function clear() {
      timeoutID = undefined
    }

    if (debounceMode && !timeoutID) {
      /*
       * Since `wrapper` is being called for the first time and
       * `debounceMode` is true (at begin), execute `callback`.
       */
      exec()
    }

    clearExistingTimeout()

    if (debounceMode === undefined && elapsed > delay) {
      /*
       * In throttle mode, if `delay` time has been exceeded, execute
       * `callback`.
       */
      exec()
    } else if (noTrailing !== true) {
      /*
       * In trailing throttle mode, since `delay` time has not been
       * exceeded, schedule `callback` to execute `delay` ms after most
       * recent execution.
       *
       * If `debounceMode` is true (at begin), schedule `clear` to execute
       * after `delay` ms.
       *
       * If `debounceMode` is false (at end), schedule `callback` to
       * execute after `delay` ms.
       */
      timeoutID = setTimeout(
        debounceMode ? clear : exec,
        debounceMode === undefined ? delay - elapsed : delay
      )
    }
  }

  wrapper.cancel = cancel // Return the wrapper function.

  return wrapper
}

var script$1 = {
  name: 'ElIcon',
  props: {
    name: String
  }
}

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    openBlock(),
    createElementBlock(
      'i',
      {
        class: normalizeClass(`el-icon-${$props.name}`)
      },
      null,
      2
      /* CLASS */
    )
  )
}

script$1.render = render$1
script$1.__file = 'packages/icon/Icon.vue'

/* istanbul ignore next */

script$1.install = function(app) {
  app.component(script$1.name, script$1)
}

const cubic = value => Math.pow(value, 3)

const easeInOutCubic = value =>
  value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2

var script = {
  name: 'ElBacktop',
  components: {
    ElIcon: script$1
  },
  props: {
    visibilityHeight: {
      type: Number,
      default: 200
    },
    target: {
      type: String,
      default: null
    },
    right: {
      type: Number,
      default: 40
    },
    bottom: {
      type: Number,
      default: 40
    }
  },

  setup(props, { emit }) {
    const el = ref(null)
    const container = ref(null)
    const visible = ref(null)
    let throttledScrollHandler
    const { visibilityHeight, target, right, bottom } = toRefs(props)
    const styleBottom = computed(() => `${bottom.value}px`)
    const styleRight = computed(() => `${right.value}px`)

    const init = () => {
      container.value = document
      el.value = document.documentElement

      if (target.value) {
        el.value = document.querySelector(target.value)

        if (!el.value) {
          throw new Error(`target is not existed: ${target.value}`)
        }

        container.value = el.value
      }
    }

    const onScroll = () => {
      const scrollTop = el.value.scrollTop
      visible.value = scrollTop >= visibilityHeight.value
    }

    const handleClick = e => {
      scrollToTop()
      emit('click', e)
    }

    const scrollToTop = () => {
      const element = el.value
      const beginTime = Date.now()
      const beginValue = element.scrollTop

      const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))

      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500

        if (progress < 1) {
          element.scrollTop = beginValue * (1 - easeInOutCubic(progress))
          rAF(frameFunc)
        } else {
          element.scrollTop = 0
        }
      }

      rAF(frameFunc)
    }

    onMounted(() => {
      init()
      throttledScrollHandler = throttle(300, onScroll)
      container.value.addEventListener('scroll', throttledScrollHandler)
    })
    onUnmounted(() => {
      container.value.removeEventListener('scroll', throttledScrollHandler)
    })
    return {
      visible,
      styleBottom,
      styleRight,
      handleClick
    }
  }
}

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = resolveComponent('el-icon')

  return (
    openBlock(),
    createBlock(
      Transition,
      {
        name: 'el-fade-in'
      },
      {
        default: withCtx(() => [
          $setup.visible
            ? (openBlock(),
              createElementBlock(
                'div',
                {
                  key: 0,
                  onClick:
                    _cache[0] ||
                    (_cache[0] = withModifiers(
                      (...args) =>
                        $setup.handleClick && $setup.handleClick(...args),
                      ['stop']
                    )),
                  style: normalizeStyle({
                    right: $setup.styleRight,
                    bottom: $setup.styleBottom
                  }),
                  class: 'el-backtop'
                },
                [
                  renderSlot(_ctx.$slots, 'default', {}, () => [
                    createVNode(_component_el_icon, {
                      name: 'caret-top'
                    })
                  ])
                ],
                4
                /* STYLE */
              ))
            : createCommentVNode('v-if', true)
        ]),
        _: 3
        /* FORWARDED */
      }
    )
  )
}

script.render = render
script.__file = 'packages/backtop/Backtop.vue'

/* istanbul ignore next */

script.install = function(app) {
  app.component(script.name, script)
}

var version = '0.0.3'

const components = [script$4, ElRow, script$3, ElScrollbar, script, script$2]

const install = (app, opts = {}) => {
  //   app.use(setupGlobalOptions(opts))
  components.forEach(component => {
    app.use(component)
  })
}

const element3 = {
  version,
  install
}

export {
  script$4 as ElAlert,
  script as ElBacktop,
  script$2 as ElButton,
  script$3 as ElCol,
  ElRow,
  ElScrollbar,
  element3 as default,
  version
}
