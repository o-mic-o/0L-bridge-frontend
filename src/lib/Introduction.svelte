<style>
  h1 {
    color: tomato;
    font-size: 4rem;
    font-weight: 600;
    line-height: 1.1;
    margin: 0;
    padding:50px 0 25px 0;
    font-family: 'CircularStd-Bold';
  }
  p {
    padding:0;
    margin:0;
    color:#bfbebe;
    font-weight: 500;
    max-width:600px;
  }
  div {
    padding-bottom:25px;
  }
  .intro {
    padding-top:75px;
  }
  @media screen and (max-width:700px) {
    .intro {
     padding:50px 10px 25px 10px;
    }
    .intro h1 {
      font-size:3rem;
    }
  }
</style>

<script>
    import '../assets/fonts.css';
    export let title = "Token Bridge";
    export let paragraph = "Welcome to the 0L Token Bridge! It's possible to swap between various other blockchain tokens to 0L using this bridge.";
</script>

<div class="intro">
  <h1>{title}</h1>
  <p>{paragraph}</p>
</div>