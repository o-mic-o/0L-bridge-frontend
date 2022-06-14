<style>
 .bridge-form-nfts {
    display: flex;
    flex-direction: column-reverse;
    margin-top:25px;
    border:2px solid #f5f0f0;
    width:600px;
    border-radius:30px;
}
  .label {
    padding:30px 0 30px 0px;
    font-size:16px;
    font-weight: 600;
    text-align: center;
    color:#bfbebe;
}
@media screen and (max-width:700px) {
    .bridge-form-nfts {
        width:100%;
    }
    .nfts-container {
        width:100%;
    }
}

</style>
<div class="nfts-container">
    <div class="{current_tab_focus=="/bridge/nfts" ? "" : "hide"} bridge-nfts-main-container">
        <div class="bridge-form-nfts reverse">
            <div class="label">NFTs coming soon!</div>
        </div>
    </div>
</div>
<script>
    export let current_tab_focus;
</script>