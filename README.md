# Auralenssp

Dưới đây là hình phát thảo bản vẽ của sản phẩm, và hình ảnh minh hoạ của sản phẩm dựa vào đó để bạn tạo hình ảnh cho sản phẩm, các kiểu gọng đang có trên thị trường , chia ra như gọng tròn, vuông tam giác, cho khách hàng lựa chọn nếu được, lưu ý là nếu chia thành 2 loại thì nếu bạn chia thành 4 màu thì trước hết bạn phải cho 2 loại mà bạn chia đó phải khác nhau về ngoại hình đừng để như nhau chỉ khác mỗi màu, vì dụ như kiểu kính toàn diện thì nó cồng kềnh và hiệu năng tốt hơn, nhưng kính thời trang lại nhìn đẹp gọn trong suốt hơn, nghĩa là bạn phải tạo 8-10 tấm ảnh sản phẩm khác nhau và lưu ý có phần chat AI tự động, và yêu cầu chính như sau , đặc biệt khi chia thành 2 loại sản phẩm đó thì bạn phải để dòng mô tả sản phẩm ngắn gọn về hiệu năng và 2 bên phải khác nhau, một cái chuyên về giá rẻ hơn nhưng cồng kềnh, một cái chuyên về thời trang thẩm mỹ, tinh giãn. Và một cái lưu ý nữa ảnh sản phẩm bạn tạo thêm vài tấm ảnh con người trai gái đẹp mang các kiểu kính đó thử, hoặc lấy ảnh con người từ ảnh tham khảo ở trên. Với yêu cầu chính khung sường như bản yêu cầu trên ( file 43 lines đó mới chính)

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://auralenssp.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/dd9d1789-7f10-457f-a41e-90b2c6e34002).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
<!-- Giao diện Camera -->
<div style="text-align: center; margin: 30px; font-family: sans-serif;">
    <h3>Quét khuôn mặt để chọn gọng kính</h3>
    <p>Vui lòng cấp quyền camera để chúng tôi phân tích tỷ lệ khuôn mặt của bạn.</p>
    
    <!-- Khung hiển thị Camera -->
    <video id="webcam" autoplay playsinline style="width: 100%; max-width: 400px; border-radius: 12px; border: 2px solid #ccc; background: #000;"></video>
    <br>
    <button id="start-camera" style="margin-top: 15px; padding: 10px 20px; background: #000; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;">
        Bật Camera
    </button>
    <p id="camera-status" style="color: #666; margin-top: 10px; font-weight: bold;"></p>
</div>

<!-- Script xử lý Camera -->
<script>
    const videoElement = document.getElementById('webcam');
    const startBtn = document.getElementById('start-camera');
    const statusText = document.getElementById('camera-status');

    startBtn.addEventListener('click', async () => {
        try {
            // Yêu cầu quyền truy cập Camera
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoElement.srcObject = stream;
            
            // Đổi text trạng thái
            startBtn.style.display = 'none'; // Ẩn nút sau khi bật
            statusText.style.color = 'green';
            statusText.innerText = "Đang quét và phân tích tỷ lệ khuôn mặt... Đang tìm gọng kính phù hợp!";
            
            // Ở đây bạn có thể chèn thêm thư viện Face API để đo đạc thực tế
            
        } catch (err) {
            statusText.style.color = 'red';
            statusText.innerText = "Lỗi: Bạn đã từ chối quyền truy cập camera hoặc thiết bị không có camera.";
            console.error("Camera error:", err);
        }
    });
</script>

```

