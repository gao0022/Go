// 动态加载脚本文件
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    // 检查脚本是否已经加载
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = (error) => {
      reject(new Error(`Failed to load script: ${src}`));
    };

    document.head.appendChild(script);
  });
};

export { loadScript };