# Giới thiệu về Lifecycle Hooks trong Angular 19

Angular 19 cung cấp các **Lifecycle Hooks**, là các phương thức đặc biệt được gọi tự động trong suốt vòng đời của một component hoặc directive. Các hooks này cho phép lập trình viên thực hiện các tác vụ cụ thể tại những thời điểm nhất định, chẳng hạn như khởi tạo, cập nhật giao diện, hoặc dọn dẹp tài nguyên.

## Các Lifecycle Hooks chính trong Angular 19

1. **ngOnInit**:
   - **Mục đích**: Được gọi một lần sau khi Angular hoàn tất việc khởi tạo các input properties của component.
   - **Ứng dụng**: Thích hợp để thực hiện các tác vụ khởi tạo như gọi API, thiết lập dữ liệu ban đầu.
   - **Lưu ý**: Không nên thực hiện logic phức tạp trong constructor, hãy sử dụng `ngOnInit`.

2. **ngOnChanges**:
   - **Mục đích**: Được gọi khi các input properties của component thay đổi.
   - **Ứng dụng**: Dùng để xử lý các thay đổi dữ liệu từ parent component.
   - **Lưu ý**: Cần kiểm tra `SimpleChanges` để biết giá trị nào đã thay đổi.

3. **ngDoCheck**:
   - **Mục đích**: Được gọi trong mỗi chu kỳ kiểm tra thay đổi (change detection).
   - **Ứng dụng**: Dùng để kiểm tra thủ công các thay đổi không được Angular tự động phát hiện.
   - **Lưu ý**: Cẩn thận khi sử dụng vì có thể ảnh hưởng đến hiệu suất.

4. **ngAfterContentInit**:
   - **Mục đích**: Được gọi sau khi Angular hoàn tất việc chèn nội dung từ bên ngoài (content projection).
   - **Ứng dụng**: Thích hợp để khởi tạo logic liên quan đến nội dung được chiếu (ng-content).

5. **ngAfterContentChecked**:
   - **Mục đích**: Được gọi sau khi Angular kiểm tra nội dung được chiếu.
   - **Ứng dụng**: Dùng để cập nhật giao diện sau khi nội dung thay đổi.

6. **ngAfterViewInit**:
   - **Mục đích**: Được gọi sau khi Angular khởi tạo toàn bộ view của component và các child views.
   - **Ứng dụng**: Thích hợp để thao tác với DOM hoặc khởi tạo các thư viện bên thứ ba (như chart.js).
   - **Lưu ý**: Đảm bảo view đã được render hoàn toàn trước khi truy cập.

7. **ngAfterViewChecked**:
   - **Mục đích**: Được gọi sau mỗi chu kỳ kiểm tra thay đổi của view và child views.
   - **Ứng dụng**: Dùng để cập nhật giao diện sau khi view thay đổi.
   - **Lưu ý**: Tránh logic nặng để không làm chậm ứng dụng.

8. **ngOnDestroy**:
   - **Mục đích**: Được gọi ngay trước khi Angular hủy component.
   - **Ứng dụng**: Dùng để dọn dẹp tài nguyên như unsubscribe các observable, clear interval, hoặc dừng các listener.
   - **Lưu ý**: Luôn implement để tránh memory leak.

## Tại sao gọi API trong ngOnInit?

- **Thời điểm phù hợp**: `ngOnInit` được gọi sau khi component được khởi tạo và các input properties đã sẵn sàng, đảm bảo dữ liệu cần thiết đã có trước khi thực hiện API call.
- **Hiệu suất**: Gọi API trong `ngOnInit` giúp tránh việc gọi nhiều lần không cần thiết (so với `ngOnChanges` hoặc `ngDoCheck`).
- **Tính rõ ràng**: Đây là nơi tiêu chuẩn để thực hiện các tác vụ khởi tạo, giúp mã nguồn dễ đọc và bảo trì.
- **Ví dụ**:
  ```typescript
  ngOnInit(): void {
    this.http.get('https://api.example.com/data').subscribe(data => {
      this.data = data;
    });
  }
  ```

## Các Lifecycle Hooks hay sử dụng trong dự án Angular

1. **ngOnInit**: Khởi tạo dữ liệu, gọi API, thiết lập các giá trị mặc định.
2. **ngOnChanges**: Xử lý thay đổi input từ parent component.
3. **ngAfterViewInit**: Thao tác với DOM hoặc tích hợp thư viện bên thứ ba.
4. **ngOnDestroy**: Dọn dẹp tài nguyên để tránh memory leak.

### Lưu ý khi sử dụng Lifecycle Hooks

- **Tránh logic nặng trong ngDoCheck**: Vì hook này chạy trong mỗi chu kỳ change detection, logic phức tạp có thể gây chậm ứng dụng.
- **Unsubscribe trong ngOnDestroy**: Với các subscription (như observable từ HTTP), luôn hủy đăng ký để tránh memory leak.
  ```typescript
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ```
- **Kiểm tra điều kiện trong ngOnChanges**: Sử dụng `SimpleChanges` để xác định chính xác thuộc tính nào thay đổi.
- **Sử dụng ngAfterViewInit cho DOM**: Tránh thao tác DOM trong `ngOnInit` vì view có thể chưa được render.
- **Tối ưu hiệu suất**: Chỉ sử dụng các hook cần thiết và tránh lạm dụng `ngDoCheck` hoặc `ngAfterViewChecked`.

## Kết luận

Hiểu và sử dụng đúng **Lifecycle Hooks** trong Angular 19 giúp lập trình viên kiểm soát tốt vòng đời của component, tối ưu hiệu suất và bảo trì mã nguồn dễ dàng hơn. `ngOnInit` là lựa chọn lý tưởng để gọi API, trong khi `ngOnDestroy` không thể thiếu để dọn dẹp tài nguyên. Các hook như `ngOnChanges` và `ngAfterViewInit` cũng rất quan trọng trong các trường hợp cụ thể, nhưng cần sử dụng cẩn thận để tránh ảnh hưởng hiệu suất.