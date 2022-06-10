<style>
.select-maximum-type {
    display: flex;
    align-items: center;
    justify-content: center;
    color:white;
    background-color:tomato;
    padding:7px;
    border-radius: 10px;
    width:60px;
    position: absolute;
    right:150px;
    top:31px;
    z-index: 1;
    cursor: pointer;
  }
  .select-maximum-type:hover {
    opacity: 0.8;
  }
</style>

<script>
    export let current_type;
    export let this_max_button_process;
</script>

<div on:click={this_max_button_process} class="select-maximum-type {current_type}">Max</div>
