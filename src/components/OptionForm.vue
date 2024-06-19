<template>
  <div class="options-wrapper">
    <div class="options-field-row">
      <div class="options-field">
        <label :for="`type_${optionData.key}`">Type</label>
        <select :id="`type_${optionData.key}`" v-model="optionData.type">
          <option disabled value="">Please select type</option>
          <option value="Call">Call</option>
          <option value="Put">Put</option>
        </select>
      </div>
      <div class="options-field">
        <label :for="`long_short_${optionData.key}`">Long/Short</label>
        <select
          :id="`long_short_${optionData.key}`"
          v-model="optionData.long_short"
        >
          <option disabled value="">Please select position</option>
          <option value="long">Long</option>
          <option value="short">Short</option>
        </select>
      </div>
    </div>
    <div class="options-field-row">
      <div class="options-field">
        <label :for="`strike_price_${optionData.key}`">Strike Price</label>
        <input
          type="number"
          :id="`strike_price_${optionData.key}`"
          min="0"
          v-model="optionData.strike_price"
        />
      </div>
      <div class="options-field">
        <label :for="`bid_${optionData.key}`">Bid Price</label>
        <input
          type="number"
          :id="`bid_${optionData.key}`"
          min="0"
          v-model="optionData.bid"
        />
      </div>
      <div class="options-field">
        <label :for="`asl_${optionData.key}`">Ask Price</label>
        <input
          type="number"
          :id="`asl_${optionData.key}`"
          min="0"
          v-model="optionData.ask"
        />
      </div>
    </div>
    <button
      type="button"
      class="btn-remove"
      title="Remove Option"
      @click="
        () => {
          $emit('remove', optionData.key);
        }
      "
    >
      &times;
    </button>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { OptionType } from "@/types";

export default Vue.extend({
  name: "OptionForm",
  props: {
    value: Object as PropType<
      OptionType & {
        key: string;
      }
    >,
  },
  data() {
    return {
      optionData: {
        ...this.value,
      },
    };
  },
  watch: {
    optionData: {
      handler(newValue) {
        this.$emit("input", newValue);
      },
      deep: true,
    },
  },
});
</script>

<style scoped>
.options-wrapper {
  position: relative;
  padding: 16px;
}

.options-wrapper + .options-wrapper {
  border-top: 1px solid #ddd;
}

.options-wrapper label {
  display: inline-block;
  margin-bottom: 4px;
  font-weight: 600;
}

.options-field-row {
  display: flex;
  column-gap: 16px;
}

.options-field-row + .options-field-row {
  margin-top: 8px;
}

.options-field {
  flex: 1;
}

input[type="number"] {
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
}

select {
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  background: none;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn-remove {
  display: inline-block;
  position: absolute;
  right: 4px;
  top: 4px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: #f44336;
  color: white;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
}
</style>
