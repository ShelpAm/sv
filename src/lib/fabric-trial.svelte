<script lang="ts">
    import * as fabric from "fabric";
    import { onMount } from "svelte";

    // 1. 明确类型定义
    // 在 Fabric 6.x 中，通常使用 fabric.Canvas
    // 如果是 5.x，类型可能是 fabric.Canvas
    let canvas: fabric.Canvas | undefined;
    let canvasElement: HTMLCanvasElement;

    onMount(() => {
        // 2. 初始化
        canvas = new fabric.Canvas(canvasElement, {
            backgroundColor: "#f0f0f0",
        });

        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: "orange",
            width: 60,
            height: 60,
            rx: 10,
            ry: 10,
        });

        const circle = new fabric.Circle({
            radius: 30,
            fill: "seagreen",
            left: 200,
            top: 150,
        });

        canvas.add(rect, circle);

        // 清理函数：防止内存泄漏和热更新导致的重复初始化
        return () => {
            canvas?.dispose();
        };
    });

    function addText() {
        // 3. TS 安全检查：确保 canvas 已经初始化
        if (!canvas) return;

        const text = new fabric.IText("双击修改我", {
            left: 150,
            top: 50,
            fontFamily: "Arial",
        });

        canvas.add(text);
        // 手动渲染（在某些 TS 环境下修改对象属性后需要显式触发）
        canvas.renderAll();
    }
</script>

<div class="controls">
    <button on:click={addText}>添加文字</button>
</div>

<canvas bind:this={canvasElement} width="500" height="400"></canvas>

<style>
    canvas {
        border: 2px solid #333;
        margin-top: 10px;
    }
    .controls {
        margin-bottom: 10px;
    }
</style>
