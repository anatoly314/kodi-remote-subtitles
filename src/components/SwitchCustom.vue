<template>
    <div>
        <input type="checkbox"
               :id="_uid"
               :checked="value"
               @input="$emit('input', $event.target.checked); $emit('change');"
               class="checkbox" />
        <label :for="_uid" class="switch"></label>
    </div>
</template>

<script>
    export default {
        props: ['value']
    }
</script>
<style lang="scss" scoped>
    .switch {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 20px;
        background-color: rgba(0, 0, 0, 0.25);
        border-radius: 20px;
        transition: all 0.3s;
    }
    .switch::after {
        content: '';
        position: absolute;
        width: 18px;
        height: 18px;
        border-radius:50%;
        background-color: white;
        top: 1px;
        left: 1px;
        transition: all 0.3s;
    }

    .checkbox:checked + .switch::after {
        left : 20px;
    }
    .checkbox:checked + .switch {
        background-color: #7983ff;
    }
    .checkbox {
        display : none;
    }


</style>
