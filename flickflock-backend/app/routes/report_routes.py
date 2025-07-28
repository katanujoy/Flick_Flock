# CRUD for Reports
# app/routes/report_routes.py
from flask import Blueprint, request, jsonify
from ..models.report import Report
from app import db
from ..schemas.report_schema import ReportSchema
from marshmallow import ValidationError
from flask_jwt_extended import jwt_required, get_jwt_identity


report_bp = Blueprint('report_bp', __name__)
report_schema = ReportSchema()

# @jwt_required
# @report_bp.route('/reports', methods=['GET'])
# def get_reports():
#     reports = Report.query.all()
#     return jsonify([r.serialize() for r in reports])

# @jwt_required
# @report_bp.route('/reports/<int:id>', methods=['GET'])
# def get_report(id):
#     report = Report.query.get_or_404(id)
#     return jsonify(report.serialize())

@report_bp.route('/reports', methods=['POST'])
@jwt_required()
def create_report():
    try:
        data = request.get_json()
        current_user_id = get_jwt_identity()

        data['reporter_id'] = current_user_id

        validated_data = ReportSchema().load(data)

        report = Report(**validated_data)
        db.session.add(report)
        db.session.commit()

        return ReportSchema().dump(report), 201

    except ValidationError as err:
        return {"errors": err.messages}, 400


# @jwt_required
# @report_bp.route('/reports/<int:id>', methods=['DELETE'])
# def delete_report(id):
#     report = Report.query.get_or_404(id)
#     db.session.delete(report)
#     db.session.commit()
#     return jsonify({"message": "Report deleted"})
