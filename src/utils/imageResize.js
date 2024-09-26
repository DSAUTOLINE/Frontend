/**
 * 난수 생성
 * @param {*} length 
 * @returns 
 */
export const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


/**
 * 이미지 리사이즈 400px x 300px
 * @param {*} e 
 * @returns 
 */
export const imageResize4_3 = (e) => {
    return new Promise((resolve, reject) => {
        const file = e.target.files[0];
        if (!file) return reject("No file selected");

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set fixed dimensions for 4:3 aspect ratio
            const newWidth = 400; // Fixed width
            const newHeight = 300; // Fixed height

            // Set canvas size to the fixed dimensions
            canvas.width = newWidth;
            canvas.height = newHeight;

            // Draw the image on the canvas with the fixed size
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            // Convert the canvas to a PNG data URL
            const pngUrl = canvas.toDataURL('image/png');

            // Resolve the Promise with the PNG URL
            resolve(pngUrl);
        };

        img.onerror = () => reject("Image load error");
    });
};


/**
 * 이미지 리사이즈 1280px x 700px
 * @param {*} e 
 * @returns 
 */
export const imageResize1280_700 = (e) => {
    return new Promise((resolve, reject) => {
        const file = e.target.files[0];
        if (!file) return reject("No file selected");

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set fixed dimensions for 4:3 aspect ratio
            const newWidth = 1280; // Fixed width
            const newHeight = 700; // Fixed height

            // Set canvas size to the fixed dimensions
            canvas.width = newWidth;
            canvas.height = newHeight;

            // Draw the image on the canvas with the fixed size
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            // Convert the canvas to a PNG data URL
            const pngUrl = canvas.toDataURL('image/png');

            // Resolve the Promise with the PNG URL
            resolve(pngUrl);
        };

        img.onerror = () => reject("Image load error");
    });
};


/**
 * 이미지 리사이즈 1920px x 700px
 * @param {*} e 
 * @returns 
 */
export const imageResize1920_700 = (e) => {
    return new Promise((resolve, reject) => {
        const file = e.target.files[0];
        if (!file) return reject("No file selected");

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set fixed dimensions for 4:3 aspect ratio
            const newWidth = 1920; // Fixed width
            const newHeight = 700; // Fixed height

            // Set canvas size to the fixed dimensions
            canvas.width = newWidth;
            canvas.height = newHeight;

            // Draw the image on the canvas with the fixed size
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            // Convert the canvas to a PNG data URL
            const pngUrl = canvas.toDataURL('image/png');

            // Resolve the Promise with the PNG URL
            resolve(pngUrl);
        };

        img.onerror = () => reject("Image load error");
    });
};


/**
 * 이미지 리사이즈 1280px x 100px
 * @param {*} e 
 * @returns 
 */
export const imageResize1280_110 = (e) => {
    return new Promise((resolve, reject) => {
        const file = e.target.files[0];
        if (!file) return reject("No file selected");

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set fixed dimensions for 4:3 aspect ratio
            const newWidth = 1280; // Fixed width
            const newHeight = 110; // Fixed height

            // Set canvas size to the fixed dimensions
            canvas.width = newWidth;
            canvas.height = newHeight;

            // Draw the image on the canvas with the fixed size
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            // Convert the canvas to a PNG data URL
            const pngUrl = canvas.toDataURL('image/png');

            // Resolve the Promise with the PNG URL
            resolve(pngUrl);
        };

        img.onerror = () => reject("Image load error");
    });
};




/**
 * 이미지 리사이즈 없이 원본 그대로 처리
 * @param {*} e 
 * @returns 
 */
export const imageKeepOriginal = (e) => {
    return new Promise((resolve, reject) => {
        const file = e.target.files[0];
        if (!file) return reject("No file selected");

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            // 이미지가 로드되면 원본 이미지를 URL로 반환
            resolve(img.src);
        };

        img.onerror = () => reject("Image load error");
    });
};