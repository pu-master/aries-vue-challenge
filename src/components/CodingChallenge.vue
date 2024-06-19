<template>
  <div>
    <h1>Options Profit Calculator</h1>
    <h2>Options</h2>
    <div class="options-form">
      <template v-for="(option, index) in options">
        <OptionForm
          :key="option.key"
          v-model="options[index]"
          @remove="removeOption"
        />
      </template>
      <button
        type="button"
        class="btn-add"
        v-if="options.length < 4"
        @click="addOption"
      >
        Add New Option
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import OptionForm from "./OptionForm.vue";
import { OptionType } from "@/types";

export default Vue.extend({
  name: "CodingChallenge",
  components: {
    OptionForm,
  },
  props: {
    optionsData: Array as PropType<OptionType[]>,
  },
  data() {
    return {
      options: this.optionsData.map((option) => ({
        ...option,
        // Add a random/unique ID.
        key: Math.random().toString(36).substring(2, 18),
      })),
    };
  },
  methods: {
    addOption() {
      this.options.push({
        key: Math.random().toString(36).substring(2, 18),
        strike_price: 0,
        type: "Call",
        bid: 0,
        ask: 0,
        long_short: "long",
        expiration_date: new Date().toISOString(),
      });
    },
    removeOption(key: string) {
      this.options = this.options.filter((option) => option.key !== key);
    },
  },
});
</script>

<style scoped>
.options-form {
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  font-size: 14px;
}

.btn-add {
  display: inline-block;
  margin-left: 16px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: #008cba;
  color: white;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
}
</style>
