import escpos from 'escpos';
import Network from 'escpos-network';

// 注册网络适配器
escpos.Network = Network;

const ReceiptWithSignature = ({ signatureImage, productName }) => {
    const handlePrint = async () => {
        const currentDate = new Date().toLocaleString();

        try {
            // 创建一个网络设备（假设打印机IP为192.168.1.100，端口为9100）
            const device = new escpos.Network('192.168.1.100', 9100);

            // 创建打印机对象
            const printer = new escpos.Printer(device);

            // 打开连接
            await new Promise((resolve, reject) => {
                device.open((error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            });

            // 打印内容
            printer
                .font('a')
                .align('ct')
                .style('b')
                .size(1, 1)
                .text('商品回执')
                .text('------------------------')
                .style('normal')
                .align('lt')
                .text(`日期时间: ${currentDate}`)
                .text(`商品名称: ${productName}`)
                .text('客户签名:')
                .image(signatureImage, 's8')
                .cut()
                .close();

            console.log('打印成功');
        } catch (error) {
            console.error('打印失败:', error);
        }
    };

    return (
        <div>
            <h2>回执预览</h2>
            <div style={{ border: '1px solid #ccc', padding: '20px', maxWidth: '300px' }}>
                <p><strong>日期时间：</strong> {new Date().toLocaleString()}</p>
                <p><strong>商品名称：</strong> {productName}</p>
                <div>
                    <p><strong>客户签名：</strong></p>
                    <img src={signatureImage} alt="Signature" style={{ width: '100%', maxWidth: '300px' }} />
                </div>
            </div>
            <button onClick={handlePrint}>打印回执</button>
        </div>
    );
};