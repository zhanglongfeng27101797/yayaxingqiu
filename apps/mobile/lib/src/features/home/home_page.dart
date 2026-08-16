import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: ListView(
        padding: const EdgeInsets.fromLTRB(20, 24, 20, 32),
        children: [
          Text('芽芽星球工作台', style: Theme.of(context).textTheme.labelLarge),
          const SizedBox(height: 12),
          Text('今天把一条内容做出来', style: Theme.of(context).textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.w800)),
          const SizedBox(height: 24),
          _ActionCard(
            icon: Icons.add_link,
            title: '采集一条内容',
            subtitle: '粘贴平台链接，进入转写与拆解流程',
            onTap: () {},
          ),
          const SizedBox(height: 28),
          Text('今天值得拍', style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w700)),
          const SizedBox(height: 12),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Row(children: [Icon(Icons.star, color: Color(0xFFE6A23C)), SizedBox(width: 8), Text('选题推荐')]),
                  const SizedBox(height: 14),
                  Text('根据创作者方向获取今日选题', style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
                  const SizedBox(height: 8),
                  const Text('接入选题接口后，这里会展示机会判断、创作空间和安全边界。'),
                  const SizedBox(height: 16),
                  FilledButton(onPressed: () {}, child: const Text('查看选题')),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _ActionCard extends StatelessWidget {
  const _ActionCard({required this.icon, required this.title, required this.subtitle, required this.onTap});

  final IconData icon;
  final String title;
  final String subtitle;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Card(
      color: Theme.of(context).colorScheme.primaryContainer,
      child: InkWell(
        borderRadius: BorderRadius.circular(20),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Row(
            children: [
              Icon(icon, size: 32),
              const SizedBox(width: 16),
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700)), const SizedBox(height: 4), Text(subtitle)])),
              const Icon(Icons.chevron_right),
            ],
          ),
        ),
      ),
    );
  }
}
