<script>
    import Introduction from './Introduction.svelte'
</script>

<main>
    <div>
        <Introduction title="Explorer" paragraph="This is the Explorer page..."/>
    </div>
</main>

<style>
   div {
    display:flex;
    align-items:center;
    justify-content: center;
    flex-direction: column;
  }
  main {
    font-family: 'CircularStd-Medium';
    text-align: center;
    padding: 0;
    margin:0 auto;
    padding-bottom:100px;
  }
</style>