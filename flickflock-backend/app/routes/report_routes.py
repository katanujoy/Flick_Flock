# CRUD for Reports
# app/routes/report_routes.py
from flask import Blueprint, request, jsonify
from ..models.report import Report
from app import db
from flask_jwt_extended import jwt_required


report_bp = Blueprint('report_bp', __name__)

@jwt_required
@report_bp.route('/reports', methods=['GET'])
def get_reports():
    reports = Report.query.all()
    return jsonify([r.serialize() for r in reports])

@jwt_required
@report_bp.route('/reports/<int:id>', methods=['GET'])
def get_report(id):
    report = Report.query.get_or_404(id)
    return jsonify(report.serialize())

@jwt_required
@report_bp.route('/reports', methods=['POST'])
def create_report():
    data = request.get_json()
    report = Report(**data)
    db.session.add(report)
    db.session.commit()
    return jsonify(report.serialize()), 201

@jwt_required
@report_bp.route('/reports/<int:id>', methods=['DELETE'])
def delete_report(id):
    report = Report.query.get_or_404(id)
    db.session.delete(report)
    db.session.commit()
    return jsonify({"message": "Report deleted"})
