<template>
  <div>
    <h1>Options Profit Calculator</h1>
    {{ "Your Code Here" }}
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { OptionType } from "@/types";

export default Vue.extend({
  name: "CodingChallenge",
  props: {
    optionsData: Array as PropType<OptionType[]>,
  },
  // Your code here
});
</script>

<style scoped>
/* Your Code Here */
</style>
