import 'package:flutter_test/flutter_test.dart';
import 'package:yaya_planet/src/app.dart';

void main() {
  testWidgets('首页展示核心采集入口', (tester) async {
    await tester.pumpWidget(const YayaPlanetApp());

    expect(find.text('今天把一条内容做出来'), findsOneWidget);
    expect(find.text('采集一条内容'), findsOneWidget);
  });
}
