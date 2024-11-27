from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class ChartViewIntegrationTests(APITestCase):
    def test_candlestick_view_integration(self):
        url = reverse('candlestick-data')  # Ensure your view's path name is set if needed
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)
        self.assertIn('data', response.data)

    def test_line_chart_view_integration(self):
        url = reverse('line-chart-data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)
        self.assertIn('labels', response.data)
        self.assertIn('data', response.data)

    def test_bar_chart_view_integration(self):
        url = reverse('bar-chart-data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)
        self.assertIn('labels', response.data)
        self.assertIn('data', response.data)

    def test_pie_chart_view_integration(self):
        url = reverse('pie-chart-data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)
        self.assertIn('labels', response.data)
        self.assertIn('data', response.data)

