// 文件上传处理
document.addEventListener('DOMContentLoaded', function() {
    const uploadBox = document.getElementById('uploadBox');
    const videoInput = document.getElementById('videoInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultContent = document.getElementById('resultContent');
    const resultPlaceholder = document.getElementById('resultPlaceholder');

    // 点击上传区域触发文件选择
    uploadBox.addEventListener('click', () => {
        videoInput.click();
    });
    
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.classList.add('dragover');
    });

    uploadBox.addEventListener('dragleave', () => {
        uploadBox.classList.remove('dragover');
    });

    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    });

    // 文件选择处理
    videoInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    });

    function handleFileSelect(file) {
        if (!file.type.startsWith('video/')) {
            alert('请选择视频文件！');
            return;
        }

        if (file.size > 100 * 1024 * 1024) { // 100MB限制
            alert('文件大小不能超过100MB！');
            return;
        }

        // 显示文件名
        const fileName = file.name.length > 20 ? 
            file.name.substring(0, 17) + '...' : file.name;
        
        uploadBox.innerHTML = `
            <div class="file-selected">
                <span>✅ ${fileName}</span>
                <p>文件大小: ${(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
        `;

        analyzeBtn.disabled = false;
    }

    // 分析按钮点击事件（模拟检测过程）
    analyzeBtn.addEventListener('click', async () => {
        analyzeBtn.disabled = true;
        analyzeBtn.textContent = '分析中...';
        
        // 模拟分析过程
        await simulateAnalysis();
        
        // 显示结果
        showResults();
        
        analyzeBtn.textContent = '重新分析';
        analyzeBtn.disabled = false;
    });

    async function simulateAnalysis() {
        // 模拟网络请求延迟
        return new Promise(resolve => {
            setTimeout(resolve, 2000);
        });
    }

    function showResults() {
        // 隐藏占位符，显示结果
        resultPlaceholder.style.display = 'none';
        resultContent.style.display = 'block';

        // 模拟随机结果（实际项目中这里应该是真实的分析结果）
        const confidence = Math.floor(Math.random() * 30 + 70); // 70-100%
        const confidenceFill = document.getElementById('confidenceFill');
        const confidenceValue = document.getElementById('confidenceValue');
        const detectionList = document.getElementById('detectionList');

        // 动画显示置信度
        let currentWidth = 0;
        const animateConfidence = setInterval(() => {
            currentWidth += 2;
            confidenceFill.style.width = currentWidth + '%';
            confidenceValue.textContent = currentWidth + '%';
            
            if (currentWidth >= confidence) {
                clearInterval(animateConfidence);
            }
        }, 20);

        // 生成检测详情
        const detections = [
            '时序一致性分析: 正常',
            '面部遮挡区域检测: 未发现异常',
            '音频视频同步: 正常',
            '压缩痕迹分析: 轻度压缩',
            '边缘一致性: 通过'
        ];

        detectionList.innerHTML = detections.map(detection => 
            `<li>${detection}</li>`
        ).join('');
    }
});