from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

class ChartViewTests(TestCase):
    def setUp(self):
        # Setting up a test client to use for requests
        self.client = APIClient()

    def test_candlestick_view(self):
        response = self.client.get('/api/candlestick-data/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {
            "data": [
                {"x": "2023-01-01", "open": 30, "high": 40, "low": 25, "close": 35},
                {"x": "2023-01-02", "open": 35, "high": 45, "low": 30, "close": 40}
            ]
        })

    def test_line_chart_view(self):
        response = self.client.get('/api/line-chart-data/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {
            "labels": ["Jan", "Feb", "Mar", "Apr"],
            "data": [10, 20, 30, 40]
        })

    def test_bar_chart_view(self):
        response = self.client.get('/api/bar-chart-data/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {
            "labels": ["Product A", "Product B", "Product C"],
            "data": [100, 150, 200]
        })

    def test_pie_chart_view(self):
        response = self.client.get('/api/pie-chart-data/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {
            "labels": ["Red", "Blue", "Yellow"],
            "data": [300, 50, 100]
        })

